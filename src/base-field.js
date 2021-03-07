/**
 * **Created on 06/03/2021**
 *
 * <File Reference Aqui: base-field.js>
 * @author André Timermann <andre@timermann.com.br>
 *
 */
'use strict'

export default {

  mounted() {
    this.insertDebugInfo()
  },

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

    /**
     * Insere informações de depuração no componente
     */
    insertDebugInfo() {


      function getRandom() {
        const min = 200, max = 255
        return Math.floor(Math.random() * (max - min)) + min
      }

      this.$el.style.setProperty('border', 'solid 2px red')
      this.$el.style.setProperty('position', 'relative')
      this.$el.style.setProperty('background-color', `rgb(${getRandom()},${getRandom()},${getRandom()})`)
      const node = document.createElement("div")
      const textnode = document.createTextNode(`${this.META_FILENAME} (${this.$attrs['field-name']})`)
      node.style.setProperty('border', 'solid 1px')
      node.style.setProperty('background-color', '#cbcaca')
      node.style.setProperty('position', 'absolute')
      node.style.setProperty('display', 'inline-block')
      node.style.setProperty('left', '100%')
      node.style.setProperty('top', '0px')
      node.style.setProperty('transform', 'translate(-100%)')
      node.style.setProperty('white-space', 'nowrap')
      node.style.setProperty('opacity', '0.6')

      node.appendChild(textnode)

      this.$el.appendChild(node)


    }

  }

}
