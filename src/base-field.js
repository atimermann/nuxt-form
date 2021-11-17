/**
 * **Created on 06/03/2021**
 *
 * src/base-field.js
 * @author André Timermann <andre@timermann.com.br>
 *
 */
'use strict'

import Debugger from './mixin/debugger'
import Validator from './mixin/validator'

export default {
  mixins: [Debugger, Validator],
  props: {
    /**
     * Lista de erros para ser exibido no campo, utilizado para validações customizadas implementado pelo usuário do
     * nuxt-form
     */
    errors: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      /**
       * Refêrencia ao form pai (null quando standalone)
       */
      form: null,
      /**
       * fieldModel, represenda o valor do formulário, pode ser alterado externamente:
       *  - Quando o formulario altera o valor via setValue
       *  - Quando no modo StandAlone o v-model é alterado (watch value + $emit('input'))
       */
      fModel: null,
      /**
       * Erros passado via prop
       */
      propsErrors: this.errors

    }
  },
  watch: {
    /**
     * Toda vez que o campo alterar valor de fModel é disparado um evento com a alteração, tanto para o vModel
     * no modo standalone, quando para o nuxt-form, (o evento é tratado no nuxt-form)
     */
    fModel(value) {
      // TODO: Ativar no modo DEBUG console.log('fModel', this.fieldName, value)
      this.$emit('input', value)
    },
    /**
     * Atualiza lista de erros se atualizar na prop
     * @param value
     */
    errors(value) {
      this.propsErrors = value
    }
  },

  methods: {
    /**
     * Define refêrencia ao formulário pai (sem refêrencia no modo standalone)
     * (Usado Internamente)
     *
     * @param form
     * @private
     */
    setForm(form) {
      this.form = form
      this.validation.mode = form.validationMode
    },
    /**
     * Usado pelo nuxtForm para setar um valor neste field
     * (Usado internamente) altera v-model para alterar o valor deste campo
     *
     * @param value
     * * @private
     */
    setValue(value) {
      this.fModel = value
    },
    /**
     * Altera lista de erros via métodos (externamente, via ref)
     * @param {string[]} errors
     */
    setErrors(errors) {
      this.propsErrors = errors
    }
  },
  computed: {
    /**
     * Verifica field está estentendo/mixin este componente
     * @return {boolean}
     */
    isNuxtFormFieldInstance() {
      return true
    },
    fieldName() {
      return this.$attrs['field-name']
    },
    /**
     * Mensagens de erro para ser exibido no campo, concatena todos tipos de erro do nuxt-form
     *
     * @type {string[]}
     */
    fErrors() {
      return [].concat(
        this.propsErrors,
        this.validation.errors
      )
    }
  }
}
