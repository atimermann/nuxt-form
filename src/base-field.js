/**
 * **Created on 06/03/2021**
 *
 * <File Reference Aqui: base-field.js>
 * @author André Timermann <andre@timermann.com.br>
 *
 */
'use strict'

import Debugger from './mixin/debugger'

export default {

  mixins: [Debugger],

  data() {
    return {
      /**
       * fieldModel, represenda o valor do formulário, pode ser alterado extarnamente:
       *  - Quando o formulario altera o valor via setValue
       *  - Quando no modo StandAlone o v-model é alterado (watch value + $emit('input')
       */
      fModel: null
    }
  },

  watch: {
    /**
     * Toda vez que o campo alterar valor de fModel é disparado um evento com a alteração, tanto para o vModel
     * no modo standalone, quando para o nuxt-form, (o evento é tratado no nuxt-form)
     */
    fModel(value) {
      this.$emit('input', value)
    }
  },

  methods: {

    /**
     * Verifica field está estentendo/mixin este componente
     * @return {boolean}
     */
    isNuxtFormFieldInstance() {
      return true
    },


    /**
     * Usado pelo nuxtForm para setar um valor neste field (usado externamente)
     * @param value
     */
    setValue(value) {
      this.fModel = value
    },


  }

}
