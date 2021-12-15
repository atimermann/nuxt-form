/**
 * **Created on 07/03/2021**
 *
 * src/mixin/validator.js
 * @author André Timermann <andre@timermann.com.br>
 *
 * Suporte validação aos fields e forms
 *
 */
'use strict'

import internalValidators from '../internal-validators'
import {capitalize, cloneDeep, isFunction, isPlainObject} from 'lodash'

export default {

  props: {
    validators: [String, Array, Object, Function],
    validationMode: {
      type: String,
      validator: value => ['onChange', 'onBlur', 'onBlurOrInvalid'].includes(value)
    }
  },

  created() {

    if (!this.validators) {
      this.validation.validatorsList = []
    } else {
      this.validation.validatorsList = Array.isArray(this.validators)
        ? this.validators
        : [this.validators]
    }

  },

  data() {


    return {
      /**
       * Informa se o estado deste campo é valido ou não
       */
      validation: {

        /**
         * Se o usuário digitou algo
         */
        dirty: false,

        invalid: false,
        /**
         * Lista de validações definida para este campo
         */
        validatorsList: [],

        /**
         * Lista de erros de validação do campo
         */
        errors: [],

        /**
         * Modo de validação,
         *
         * No modo formulário pode ser:
         *      - onChange (valida se dirty e em qualquer alteração, ex: digitar do usuario)
         *      - onBlur (valida se dirty e perder foco)
         *      - onBlurOrInvalid (valida se dirty e (perder o foco ou se for invalido, com qualquer mudança)
         *      - onSubmit (valida apenas no submit)
         *      - onSubmitOrInvalid (valida apenas no submit ou com qualquer mudança)
         *
         * No modo standAlone:
         *      - onChange (valida se dirty e em qualquer alteração, ex: digitar do usuario)
         *      - onBlur (valida se dirty e perder foco)
         *      - onBlurOrInvalid (valida se dirty e (perder o foco ou se for invalido, com qualquer mudança)*
         *
         */
        mode: this.validationMode || 'onChange'
      }
    }
  },

  watch: {
    /**
     * Valida campo toda vez que value for alterado
     */
    async fModel() {

      if (
        (this.validation.dirty && this.validation.mode === 'onChange')
        ||
        (
          this.validation.dirty &&
          this.validation.invalid &&
          (this.validation.mode === 'onBlurOrInvalid' || this.validation.mode === 'onSubmitOrInvalid')
        )
      ) {
        await this.validate()
      }
    }
  },


  methods: {

    /**
     *  Método que deve ser chamado sempre que usuario fizer uma alteração no campo
     *  Difere de change, pois change pode ser acionado pelo formulário sem ação humana
     */
    touch() {
      this.validation.dirty = true
    },
    /**
     *  Método que deve ser chamado sempre que usuario perder o foco
     */
    async blur() {
      if (this.validation.mode === 'onBlur' || this.validation.mode === 'onBlurOrInvalid') {
        await this.validate()
      }

    },

    /**
     * Executa validação deste campo
     *
     * @param {string[]} validatedFields  Usado internamente, indica quais campos já foram validados, impede que o
     *    campo A requisite validação de B e B requisite de A, evitando assim, loop infinito
     */
    async validate(validatedFields = []) {

      validatedFields.push(this.fieldName)

      /**
       * Uma cópia do model do form, ou seja podemos acessar valores de qualquer outro campo.
       * Exemplo: verificar se a senha preenchida pelo usuário em outro campo é idêntico a este
       *
       * No Modo StandAlone é null
       *
       * @type {*|null}
       */
      const formModel = this.form ? cloneDeep(this.form.model) : null

      let invalid = false
      let errors = []

      /**
       * Lista de outros campos que precisam ser validado (exemplo: verificação de senha)
       * não funciona modo standalone
       *
       * @type {*[]}
       */
      let otherFieldsValidate = []

      const processaValidationResult = ({valid, error, errorValues, validate}) => {
        if (!valid) invalid = true
        if (!valid) errors.push({error, errorValues})

        // Requisita validação de outro campo
        if (validate && !validatedFields.includes(validate)) otherFieldsValidate.push(validate)
      }

      // ATENÇÃO: invalid só pode ser alterado para true, dentro do loop
      for (const validator of this.validation.validatorsList) {

        if (isFunction(validator)) {
          processaValidationResult(await validator(this.fModel, formModel))
        } else {

          let validatorName = undefined
          let validatorOptions = undefined

          if (typeof validator === 'string') {
            validatorName = validator
          } else if (isPlainObject(validator)) {
            validatorName = validator.validator
            validatorOptions = validator.options
          }

          if (this.$options.validators[validatorName]) {

            // passar this.form.model para um metodo em this.$options causa efeito colateral no objeto,  manter
            // clonedeep para formar passagem de parametro por cópia (objeto por patrão é passado por referencia)
            // evitando assim que model sejá alterado
            processaValidationResult(await this.$options.validators[validatorName].call(this, this.fModel, formModel, validatorOptions))

          } else if (internalValidators[validatorName]) {
            processaValidationResult(await internalValidators[validatorName].call(this, this.fModel, formModel, validatorOptions))

          } else {
            throw new Error(`Validation "${validatorName}" not found`)
          }
        }
      }

      // Atualiza no final, para agaurdar as validações assincronas
      this.validation.invalid = invalid

      // Atualiza lista de erros
      this.validation.errors = []

      for (const {error, errorValues} of errors) {

        if (this._i18n && this.$t) {
          this.validation.errors.push(capitalize(this.$t(error, errorValues || {})))
        } else {
          // TODO: Implementar substituição de variavel, enquanto isso só aceita modo nuxt-i18n
          // const translate = require('../lang/' + this.options.language).default
          // this.validation.validationErrors.push(capitalize(translate[error]))
        }
      }

      if (otherFieldsValidate.length > 0) {

        if (!form) {
          throw new Error('it is not possible to validate another field in stand alone mode')
        }

        this.form.validate(otherFieldsValidate, validatedFields)
      }

    },

    isValid() {
      return !this.validation.invalid
    }

  },

  /**
   * Campos podemos implementar suas próprias validações
   */
  validators: {}
}
