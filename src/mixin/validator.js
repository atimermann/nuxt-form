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
import {capitalize, isFunction, isPlainObject, cloneDeep} from 'lodash'

export default {

  props: {
    validators: [String, Array, Object, Function]
  },

  data() {

    let validatorsList
    if (!this.validators) {
      validatorsList = []
    } else {
      validatorsList = Array.isArray(this.validators)
        ? this.validators
        : [this.validators]
    }


    return {
      /**
       * Informa se o estado deste campo é valido ou não
       */
      validation: {
        invalid: false,
        /**
         * Lista de validações definida para este campo
         */
        validatorsList,

        /**
         * Lista de erros que será exibido no campo
         */
        validationErrors: []
      },
    }
  },

  mounted() {
  },

  watch: {
    /**
     * Valida campo toda vez que value for alterado
     */
    async fModel(value) {
      await this.validate(value)
    }
  },


  methods: {

    /**
     * Valida campo
     *
     * @param value
     * @return {Promise<void>}
     */
    async validate(value) {

      let invalid = false
      let errors = []

      // ATENÇÃO: invalid só pode ser alterado para true, dentro do loop
      for (const validator of this.validation.validatorsList) {

        if (isFunction(validator)) {

          const {valid, error, errorValues} = await validator(value, cloneDeep(this.form.model))
          if (!valid) invalid = true
          if (!valid) errors.push({error, errorValues})

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
            const {
              valid,
              error,
              errorValues
            } = await this.$options.validators[validatorName](value, cloneDeep(this.form.model), validatorOptions)
            if (!valid) invalid = true
            if (!valid) errors.push({error, errorValues})

          } else if (internalValidators[validatorName]) {
            const {valid, error, errorValues} = await internalValidators[validatorName](value, cloneDeep(this.form.model), validatorOptions)
            if (!valid) invalid = true
            if (!valid) errors.push({error, errorValues})

          } else {
            throw new Error(`Validation "${validatorName}" not found`)
          }
        }
      }
      // Atualiza no final, para agaurdar as validações assincronas
      this.validation.invalid = invalid

      this.validation.validationErrors = []
      for (const {error, errorValues} of errors) {
        if (this.options.nuxtI18n && this._i18n && this.$t) {
          this.validation.validationErrors.push(capitalize(this.$t(error, errorValues || {})))
        } else {
          // TODO: Implementar substituição de variavel, enquanto isso só aceita modo nuxt-i18n
          // const translate = require('../lang/' + this.options.language).default
          // this.validation.validationErrors.push(capitalize(translate[error]))
        }

      }

      // TODO: ONDE PAREI
      /**
       * TODO:
       *  - Modos de validação (on submit apenas, para formulários pesados) onblir
       *
       *  - Criar arquivos com traduções padrão, para ser mesclado pelo usuario no i18n, porém usuario deve fazer manualmente,explicar como
       *  - documentar como fazer isso para validações customizada
       *  - documentar transformar em assincrono
       *  - validação fica nos campos, pode ser usado no modo standalone
       *  - Campos podem implementar suas próprios validações (documentar)
       *  - Validação global       *
       *  - explicar bem como funciona error e errorValues que ficou um pouco confuso
       *  - Exemplicar como adicionar erro no campo e erros globais
       *  - Documentar que precisa converter para string antes de tentar validar usando biblitoeca validator
       *  - criar referencia de metodos do form e dos fields
       *  - Criar slots para customização do form

       */

    },

  },

  /**
   * Campos podemos implementar suas próprias validações
   */
  validators: {}
}
