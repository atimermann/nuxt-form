<template>
  <div>
    <vue-phone-number-input
        v-model="vuePhoneNumberInputModel"
        :error="!!fErrors.length"
        v-bind="$props"
        v-on="$listeners"
        :translations='translations'
        @phone-number-blur="blur"
        @update="update"
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
 * Validação interna:
 *  phone
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
      vuePhoneNumberInputModel: '',
      /**
       * Usado pelo validador       *
       */
      isValidPhoneNumber: false,
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
    'disabled',
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
  ],

  methods: {
    setValue(value) {

      // BUGFIX, só funciona se mandar pra fila do eventLoop
      this.$nextTick(() => {
        this.fModel = value
        this.vuePhoneNumberInputModel = this.fModel

      })
    },

    update(data) {
      this.fModel = data.formatInternational
      this.isValidPhoneNumber = data.isValid
      this.touch()
    }
  },

  validators: {
    phone(value, model, options) {
      return this.isValidPhoneNumber
          ? {valid: true}
          : {valid: false, error: 'VALIDATOR_INVALID_PHONE_NUMBER'}


    }
  }
}
</script>
