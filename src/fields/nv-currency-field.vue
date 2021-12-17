<template>
  <div class="pb-3">
    <v-text-field
        ref="inputRef"
        v-model="formattedValue"
        v-currency="currencyOptions"
        v-bind="$props"
        :error="!!fErrors.length"
        @keydown="touch"
        @blur="blur"
        @input="update"
    />
    <error-message :errors="fErrors"/>
  </div>
</template>
<script>
/**
 * TODO: Neste campo, está sendo utilizado o vue-currency-input de forma errada, estamos aproveitando funções interna
 * do componente, porém se atualizar para qualquer versão quebra.
 *
 * Necessário fazer um refactoring completo, usando outra forma:
 * - Utilizar outro plugin de mascara
 * - formatar os valores usando alguma bibliteca + simples
 * - Remover dependencia e importação da lib em plugin-loader.js
 *
 * Apenas funciona na versão 1.18 (NUNCA ATUALIZAR)
 * Rêf: https://dm4t2.github.io/vue-currency-input/config/#component
 *
 */

import BaseField from '@agtm/nuxt-form/src/base-field'
import ErrorMessage from '@agtm/nuxt-form/src/error-message'
import {parseCurrency, setValue as setCurrencyValue} from 'vue-currency-input'

export default {
  name: 'nv-currency-field',
  components: {ErrorMessage},
  extends: BaseField,

  props: {
    currency: String,
    locale: {
      type: String,
      default: 'pt-BR'
    },
    // Text field
    appendOuterIcon: String,
    autofocus: Boolean,
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: '$clear',
    },
    counter: [Boolean, Number, String],
    counterValue: Function,
    filled: Boolean,
    flat: Boolean,
    fullWidth: Boolean,
    disabled: Boolean,
    label: String,
    outlined: Boolean,
    placeholder: String,
    prefix: String,
    prependInnerIcon: String,
    reverse: Boolean,
    rounded: Boolean,
    shaped: Boolean,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    suffix: String,
    appendIcon: String,
    backgroundColor: {
      type: String,
      default: '',
    },
    dense: Boolean,
    height: [Number, String],
    hideDetails: [Boolean, String],
    hint: String,
    id: String,
    loading: Boolean,
    persistentHint: Boolean,
    prependIcon: String
  },

  data() {
    return {
      formattedValue: '',
    }
  },

  methods: {
    setValue(value) {
      this.fModel = value
      setCurrencyValue((this.$refs.inputRef).$el.querySelector('input'), value)
    },
    /**
     * Saída de dados: Atualiza fModel
     */
    update() {
      this.fModel = parseCurrency(this.formattedValue, this.currencyOptions)
    }
  },
  computed: {
    currencyOptions() {
      return {
        currency: this.currency,
        locale: this.locale
      }
    }
  }
}
</script>
