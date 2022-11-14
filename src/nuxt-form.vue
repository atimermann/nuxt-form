<template>
  <form>
    <!--    Campos criados manualmente -->
    <slot></slot>
    <div v-for="(field, index) in generatedSchema()" :key="index">

      <!--  Campos criados manualmente mas de  posição customizada (opcional, só implementar se for simples)   -->
      <slot v-if="field.fromSlot" :name="field.fieldName"></slot>
      <!--   Campos criados automaticamente  -->
      <component
          v-else-if="!field.hide"
          :is="field.fieldType"
          v-bind="field"
          :field-name="field.fieldName"
          :validators="field.validators"
      />
    </div>
    <v-alert v-for="(globalError, globalErrorIndex) in globalErrors" :key="'g' + globalErrorIndex" type="error">
      {{ globalError }}
    </v-alert>
  </form>
</template>

<script>

import {cloneDeep, defaults, get, isEqual, isPlainObject, toNumber} from 'lodash'

export default {
  name: 'nuxt-form',

  props: {
    /**
     * Descreve os campos do formulário (formato json) mapeia campo com dado
     */
    schema: {
      type: Array,
      default: () => []
    },
    /**
     * Representa os dados de todos os campos do formulário, obrigatório ser objeto ou instancia de nuxt-model
     */
    value: {
      default() {
        return {}
      },
      validator: function (value) {
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
    disableFieldsUpdateByVModel: {
      type: Boolean,
      default: true
    },

    /**
     *  Ao carregador valores dos campos ou ao submeter formuláriop, atributos com valor null são removidos do resultado final.
     */
    cleanNullValuesOnSubmit: {
      type: Boolean,
      default: true
    }

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
      preLoadedFieldsName: [],
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

    // Verifica se é um Nuxt Model
    if (this.value.constructor._modelClass) {
      // Vincula value (instancia de nuxtModel) ao model e impede q seja alterado
      Object.defineProperty(this, 'model', {
        enumerable: false,   // não enumerável
        configurable: false, // não configurável
        writable: false,     // não gravável
        value: this.value
      })

      // Sincroniza sempre que ocorrer uma alteração
      this.value.onChange((attr, value) => {
        // TODO: Ativar no modo DEBUG console.log('Change', attr, value)
        this._syncFieldsWithFormModel()
      })

      this._syncFieldsWithFormModel()
    } else {
      // Sincroniza form(model) e fields valores vindo da prop
      this.setValues(this.value)
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
     * Gera schema que será renderizado pelo formulario
     */
    generatedSchema() {

      const definedFieldsNameInSchema = []

      /**
       * Ignora fields definidos no schema, em favor dos fields adicionados via slots
       */
      const schema = this.schema
          .filter(field => !this.preLoadedFieldsName.includes(field.fieldName))
          .map(field => {
            definedFieldsNameInSchema.push(field.fieldName)
            field.fromSlot = Object.keys(this.$slots).includes(field.fieldName)
            return field
          })


      // TODO: Criar um metodo ou arquivo (Mixin) separado para tratar a geração automatica de campo à partir do modelo
      // Gera Schema Baseado no Model
      if (this.value.constructor._modelClass) {
        const Class = this.value.constructor
        for (const classAttribute of Object.getOwnPropertyNames(Class)) {
          if (classAttribute.substr(-4) === 'Type') {
            const attrName = classAttribute.substring(0, classAttribute.length - 4)

            if (!this.preLoadedFieldsName.includes(attrName) && !definedFieldsNameInSchema.includes(attrName)) {

              let attrType = cloneDeep(Class[classAttribute])
              if (typeof attrType === 'string') {
                attrType = {
                  type: attrType
                }
              }

              // TODO: Criar uma função para gerar campo sautomaticamente apartir do tipo de dados do Model
              // Atualmente está fixo em nv-text-field
              delete attrType.type
              schema.push(defaults(attrType, {
                    fieldType: 'nv-text-field',
                    fieldName: attrName
                  })
              )
            }

          }
        }
      }

      return schema
    },

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
      this.$emit('submit', this.isValid(), this.getValues(), this.fieldsComponentIndex)
    },

    /**
     *  Retorna todos os valores do formulário (this.model) com alguns filtros e tratamento.
     *
     * @param model   Usado internamente, transpassa o objeto recursivamente
     *
     * @return {{}} Valores tratados
     */
    getValues(model) {

      model = model === undefined
          ? cloneDeep(this.model)
          : model

      const result = {}
      for (const [attribute, value] of Object.entries(model)) {

        // Remove campos cujo valor é null ou undefined
        if ((value === null || value === undefined) && this.cleanNullValuesOnSubmit) {
          continue
        }

        if (isPlainObject(value)) {
          value = this.getValues(value)
          if (Object.keys(value).length === 0 && this.cleanNullValuesOnSubmit) continue
        }

        result[attribute] = value

      }

      return result
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

      // TODO: Ativar no modo DEBUG  console.log('VALIDANDO', fieldsName)
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

        if (!this.fieldsComponentIndex[fieldName].isValid()) {
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
        this.fieldsComponentIndex[fieldName].clearErrors()
      }
      this.globalErrors = []
    },

    /**
     * Define todos os erros genericos (Limpa antigos)
     *
     * @param {string[]} errors Lista de erros genéricos
     */
    setErrors(errors) {
      this.globalErrors = errors
    },

    /**
     * Adiciona um erro genérico
     *
     * @param {string} error
     */
    addError(error) {
      this.globalErrors.push(error)
    },

    /**
     * Retorna uma instancia de um field especifico
     *
     * @param fieldName

     */
    getField(fieldName) {
      return this.fieldsComponentIndex[fieldName]
    },

    /**
     * Procura por FieldComponentes carregado por slots, analisando Vnode
     */
    _findVNodeFieldComponent(VNode) {

      if (VNode.data && VNode.data.attrs) {
        const fieldName = VNode.data.attrs['field-name']
        if (fieldName) {
          this.preLoadedFieldsName.push(fieldName)
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

          if (this.fieldsComponentIndex[fieldName]) {
            throw new Error(`Field "${fieldName}" already exist.`)
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

        this._setObjectValue(object, attrName, value)

      } else {

        // Cria novo subobjeto no objeto caso não exista
        if (object[attrName] === undefined) {
          this.$set(object, attrName, {})
        }
        this._setObject(object[attrName], path, value)
      }

    },

    /**
     *
     * Atribui valor ao model
     *
     */
    _setObjectValue(object, attrName, value) {

      // Se Instancia de Nuxt Model
      if (object.constructor._modelClass) {

        // Nuxt model, tem uma verificaçãod e tipo forte, como o form sempre retorna string, precisamos verificar o
        // tipo da Classe, e converter de acordo

        // Vai na classe puxar o tipo
        let fieldType = object.constructor[attrName + 'Type']

        if (!fieldType) {
          throw new Error(`Field "${attrName}" not defined in model "${object.constructor.getClassName()}"`)
        }

        // Se tiver no formato objeto (São 2 tipos)
        if (typeof fieldType !== 'string') {
          fieldType = fieldType.type
        }

        // Não vamos forçar tipo string, vamos assumir que o formulário sempre envia string, pode ser necessário alterar
        // no futuro, date já aceita string
        if (fieldType === 'number') {
          object[attrName] = toNumber(value)
        } else if (fieldType === 'boolean') {
          object[attrName] = !!value
        } else {
          object[attrName] = value
        }


      } else {

        object[attrName] === undefined
            ? this.$set(object, attrName, value)
            : object[attrName] = value
      }


    },

    /**
     * Atribui valores a um atributo recursivamente, configurando observer no processo
     * Não altera objeto
     *
     */
    _setObjectAttribute(object, attrName, value) {

      // TODO: Ativar no modo DEBUG  console.log('_setObjectAttribute', object, attrName, value)

      if (value === undefined) value = null

      if (isPlainObject(value)) {

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

      // TODO: Ativar no modo DEBUG  console.log('Sincronizando...')
      for (const fieldName of this.fieldsName) {
        this.fieldsComponentIndex[fieldName].setValue(get(this.model, fieldName))
      }
    }

  }
}
</script>
