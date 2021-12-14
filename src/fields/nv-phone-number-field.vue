<template>
  <div class="pb-3">

    <vue-phone-number-input
        v-model="fModel"
        :error="!!fErrors.length"
        v-bind="$props"
        :translations='translations'
        @phone-number-blur="blur"
        @update="touch"
    />
    <error-message :errors="fErrors"/>
  </div>
</template>
<script>
/**
 * Ref: https://github.com/LouisMazel/vue-phone-number-input
 *
 * TODO: Mudar css para ficar igual vuetify (Material design)
 *
 */
import BaseField from '@agtm/nuxt-form/src/base-field'
import ErrorMessage from '@agtm/nuxt-form/src/error-message'

export default {
  name: 'nv-phone-number-field',
  components: {ErrorMessage},
  extends: BaseField,

  data() {

    return {
      // TODO: Criar computed q retorna tradução  baseada no vue-i18n do nuxt
      translations: {
        countrySelectorLabel: 'Código do país',
        countrySelectorError: 'Escolha um país',
        phoneNumberLabel: 'Número de telefone',
        example: 'Exemplo :'
      }
    }
  },
  props: [
    'id',
    'color',
    'valid-color',
    'error-color',
    'size',
    'default-country-code',
    'preferred-countries',
    'ignored-countries',
    'only-countries',
    'no-validator-state',
    'no-flags',
    // 'disabled',
    'dark',
    'dark-color',
    // 'required',
    'clearable',
    'loader',
    'countries-height',
    'no-use-browser-locale',
    'fetch-country',
    'no-country-selector',
    'border-radius',
    'show-code-on-list',
    'no-example'
  ]
}
</script>



