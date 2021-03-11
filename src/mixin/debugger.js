/**
 * **Created on 07/03/2021**
 *
 * src/mixin/debugger.js
 * @author André Timermann <andre@timermann.com.br>
 *
 *   Adiciona funções de depuração
 *
 */
'use strict'


export default {

  mounted() {

    if (this.options?.debugger) {
      this.insertDebugInfo()
    }

  },

  data() {
    return {
      fModelElement: document.createElement("div"),
      // invalidlement: document.createElement("div")
    }
  },

  watch: {
    fModel(value) {
      this.fModelElement.innerText = `fModel: ${value}`
    },
    // $invalid(value) {
    //   this.invalidElement.innerText = `Invalid: ${value}`
    // },
  },

  methods: {
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
      node.style.setProperty('border', 'solid 1px')
      node.style.setProperty('background-color', '#cbcaca')
      node.style.setProperty('position', 'absolute')
      node.style.setProperty('display', 'inline-block')
      node.style.setProperty('left', '100%')
      node.style.setProperty('top', '0px')
      node.style.setProperty('transform', 'translate(-100%)')
      node.style.setProperty('white-space', 'nowrap')
      node.style.setProperty('opacity', '0.6')

      const node2 = document.createElement("div")
      node2.appendChild(document.createTextNode(this.META_FILENAME))
      node.appendChild(node2)

      const node3 = document.createElement("div")
      node3.appendChild(document.createTextNode(`field-name: ${this.$attrs['field-name']}`))
      node.appendChild(node3)

      // --- Watches ---
      node.appendChild(this.fModelElement)
      // node.appendChild(this.invalidlement)

      this.$el.appendChild(node)


    }

  }

}
