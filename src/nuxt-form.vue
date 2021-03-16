<template>
  <div>
    <div>--- BEGIN nuxt-form vars ---</div>
    fieldsName={{ fieldsName }} <br>
    value={{ value }} <br/>
    model={{ model }} <br/>
    preLoadedFields={{ preLoadedFields }}
    <div>--- END nuxt-form vars ---</div>
    <!--    Campos criados manualmente -->
    <slot></slot>
    <div v-for="(field, index) in validSchema" :key="index">
      <!--  Campos criados manualmente mas de  posição customizada (opcional, só implementar se for simples)   -->
      <slot v-if="field.fromSlot" :name="field.fieldName"></slot>
      <!--   Campos criados automaticamente  -->
      <component
          v-else
          :is="field.fieldType"
          :field-name="field.fieldName"
          :validators="field.validators"
      />
    </div>
    <v-alert v-for="(globalError, globalErrorIndex) in globalErrors" :key="'g' + globalErrorIndex" type="error">
      {{ globalError }}
    </v-alert>
  </div>
</template>

<script>

import {cloneDeep, get, isEqual} from 'lodash'

export default {
  name: "nuxt-form",

  props: {
    /**
     * Descreve os campos do formulário (formato json) mapeia campo com dado
     */
    schema: Array,
    /**
     * Representa os dados de todos os campos do formulário, obrigatório ser objeto ou instancia de nuxt-model
     */
    value: {
      validator: function (value) {
        // TODO: Validar se é Objeto ou instancia de nuxt-model
        return typeof value === 'object'
      }
    },
    /**
     * Modo de validação:
     *
     *      - onChange (valida se dirty e em qualquer alteração, ex: digitar do usuario)
     *      - onBlur (valida se dirty e perder foco)
     *      - onBlurOrInvalid (valida se dirty e (perder o foco ou se for invalido, com qualquer mudança)
     *      - onSubmit (valida apenas no submit)
     *      - onSubmitOrInvalid (valida apenas no submit ou com qualquer mudança)
     */
    validationMode: {
      type: String,
      default: 'onChange',
      validator: value => ['onChange', 'onBlur', 'onBlurOrInvalid', 'onSubmit', 'onSubmitOrInvalid'].includes(value)
    },

    /**
     * Por padrão ao alterar valor de v-model, todos os campos tem seus valores sincronizados com model do formulário
     * Porém, isto causa um efeito colateral, sempre que um campo altera seu valor, todo formulário é atualizado
     * novamente, podendo causar lentidão em formulários muito grande.
     *
     * Utilize esta opção para melhorar performance nesses casos.
     *
     * @type {boolean}
     */
    disableFieldsUpdateByVModel: true

  },

  data() {
    return {

      /**
       * Representa todos os valores (dados) do formulário, pode ser um objeto ou uma instancia de nuxt-model
       *
       * @type {object}
       */
      model: {},

      /**
       * List de campos pré carregados nos slots, usado para o gerador automatico não recarregar o mesmo campo
       * duas vezes
       */
      preLoadedFields: [],
      /**
       * Lista Indexada pelo nome de todos os campos do formulário
       * Dicionário de componentes
       *
       * @type {TODO: Como definir dict no jsdoc}
       */
      fieldsComponentIndex: {},
      /**
       * Lista de nomes de todos os campos do formulário
       *
       * @type {string[]}
       */
      fieldsName: [],

      /**
       * Lista de erros globais
       */
      globalErrors: []
    }
  },

  // Não remover linha abaixo
  mixins: [],

  created() {
    if (this.$slots.default) {
      for (const VNode of this.$slots.default) {
        this._findVNodeFieldComponent(VNode)
      }
    }

  },

  mounted() {
    this._mapChildrens(this)
    // Sincroniza form(model) e fields valores vindo da prop
    this.setValues(this.value)
  },

  computed: {
    /**
     * Ignora fields definidos no schema, porém adicionaros nos slots
     */
    validSchema() {
      return this.schema
          .filter(field => !this.preLoadedFields.includes(field.fieldName))
          .map(field => {
            field.fromSlot = Object.keys(this.$slots).includes(field.fieldName)
            return field
          })
    }
  },

  watch: {
    /**
     *  Substitui valores do formulário por novos
     */
    value(values) {
      // Otimiza
      if (isEqual(values, this.model)) return
      this.model = {}
      this.setValues(values)
    }
  },


  methods: {

    /**
     * Atribui valores para model, sem limprar dados antigos
     * @param values
     */
    setValues(values) {
      for (const [attribute, value] of Object.entries(values)) {
        this._setObjectAttribute(this.model, attribute, value)
      }
      this._syncFieldsWithFormModel()
    },


    /**
     * Realiza Submit do Formulário
     */
    async submit() {
      await this.validate()
      this.$emit('submit', this.isValid(), this.model, this.fieldsComponentIndex)
    },


    /**
     * Executa validação do formulário
     *
     * @param {string[]} fieldsName       Lista nome de campos para validar
     * @param {string[]} validatedFields  Usado internamente, indica quais campos já foram validados, impede que o
     *    campo A requisite validação de B e B requisite de A, evitando assim, loop infinito
     */
    async validate(fieldsName = this.fieldsName, validatedFields = []) {
      // valida sempre que perguntar e o modo de validação for no submit

      console.log('VALIDANDO', fieldsName)
      for (const fieldName of fieldsName) {
        await this.fieldsComponentIndex[fieldName].validate(validatedFields)
      }

    },

    /**
     *  Verifica se formulário é válido (todos os campos estão validados)
     */
    isValid() {

      let valid = true
      for (const fieldName of this.fieldsName) {

        if (this.fieldsComponentIndex[fieldName].validation.invalid) {
          valid = false
          break
        }
      }
      return valid

    },

    /**
     * Limpa todos os Erros globais e erros de campos customizados
     * Não limpa erros de validações internas
     *
     */
    clearErrors() {
      for (const fieldName of this.fieldsName) {
        this.fieldsComponentIndex[fieldName].setErrors([])
      }
      this.globalErrors = []
    },

    /**
     * Define erros globais (Limpa antigos)
     *
     * @param {string[]} errors
     */
    setErrors(errors) {
      this.globalErrors = errors
    },

    /**
     * Adiciona um erro Global
     *
     * @param {string} error
     */
    addErrors(error) {
      this.globalErrors.push(error)
    },

    /**
     * Procura por FieldComponentes carregado por slots, analisando Vnode
     */
    _findVNodeFieldComponent(VNode) {

      if (VNode.data && VNode.data.attrs) {
        const fieldName = VNode.data.attrs['field-name']
        if (fieldName) {
          this.preLoadedFields.push(fieldName)
        }
      }

      if (VNode.children) {
        for (const VNode of VNode.children) {
          this._findVNodeFieldComponent(VNode)
        }
      }
    },

    /**
     * Indexa todos os campos do formulário
     *
     * Varre todos os elementos html a procura de componentes instancia de field
     *
     * @private
     */
    _mapChildrens(component) {

      for (const fieldComponent of component.$children) {


        if (fieldComponent.isNuxtFormFieldInstance) {

          const fieldName = fieldComponent.$attrs['field-name']

          if (!fieldName) {
            console.error(fieldComponent.$attrs)
            throw new Error('Attribute fieldName é required in field')
          }

          this.fieldsComponentIndex[fieldName] = fieldComponent
          this.fieldsName.push(fieldName)

          fieldComponent.setForm(this)

          // Criação do evento que será disparado quando um campo atualizar o valor, atualizando model (listen escuta)
          fieldComponent.$on('input', (value) => {

            // Converte undefined pra null TODO: Monitorar se é melhor definir ou ignorar
            if (value === undefined) value = null

            const pre = cloneDeep(this.model)
            this._setObject(this.model, fieldName.split('.'), value)

            if (!isEqual(pre, this.model)) {
              this.$emit('input', this.model)
            }

          })
          //
          // // Criação do evento que será disparado quando um campo requisitar validação
          // // eslint-disable-next-line
          // children.$on('validate', () => {
          //
          //   // Limpa mensagens de erro
          //   this.errorMessages[fieldName] = ''
          //   this.fieldsComponentIndex[fieldName].vErrors = []// validateClient(this.vue, '')
          //
          //   // Valida apenas este campo
          //   this.validateClientField(fieldName)
          // })
        } else {
          this._mapChildrens(fieldComponent)
        }
      }
    }
    ,

    /**
     *  Atribui valores a um atributo de um objeto rescursivamente, configurando observer no processo.
     *  Não muta o objeto no processo
     *
     *  Diferente pro _setObjectAttribute, aqui as atribuições são feitas através de um caminho de string (path)
     *
     *        a.b.c = 123
     *        (apenas um valore é definido no model, criando objetos no caminho com vue observer
     *
     *  enquanto no _setObjectAttribute você passa um objeto que é espelhado no model criando vue observer
     *        {
     *          a: {
     *           b:{
     *              c: 123
     *           }
     *          }
     *        }
     *
     */
    _setObject(object, path, value) {

      const attrName = path.shift()

      // Chegou na folha da arvore
      if (path.length === 0) {

        object[attrName] === undefined
            ? this.$set(object, attrName, value)
            : object[attrName] = value

      } else {

        // Cria novo subobjeto no objeto caso não exista
        if (object[attrName] === undefined) {
          this.$set(object, attrName, {})
        }
        this._setObject(object[attrName], path, value)
      }

    },

    /**
     * Atribui valores a um atributo recursivamente, configurando observe rno processo
     * Não muda objeto
     *
     */
    _setObjectAttribute(object, attrName, value) {

      console.log('_setObjectAttribute', object, attrName, value)

      if (value === undefined) value = null

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {

        // Cria novo subobjeto no objeto caso não exista
        if (object[attrName] === undefined) {
          this.$set(object, attrName, {})
        }

        for (const [attribute, value] of Object.entries(value)) {
          this._setObjectAttribute(object[attrName], attribute, value)
        }

      } else {

        object[attrName] === undefined
            ? this.$set(object, attrName, value)
            : object[attrName] = value

      }

    },

    /**
     * Sincroniza valores dos campos com os valores no model do formulário
     * Utiliza funções at/set do lodash para acessar atributos no objeto (tree)
     *
     * @private
     */
    _syncFieldsWithFormModel() {
      for (const fieldName of this.fieldsName) {
        this.fieldsComponentIndex[fieldName].setValue(get(this.model, fieldName))
      }
    }


  }
}
</script>
