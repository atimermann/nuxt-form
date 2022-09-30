<template>
  <div>
    <!--  reverse: Atributo com problema se passar com v-bind  -->
    <v-select
        v-model="fModel"
        v-bind="$props"
        v-on="$listeners"
        :error="!!fErrors.length"
        :reverse="reverse?true:false"
        @change="touch"
        @blur="blur"
    >
      <template v-slot:item="{ item }">
        <img :src="item.image" class="mr-2">
        {{ item.text }}
      </template>

      <template v-slot:selection="{ item, index }">
        <img :src="item.image" class="mr-2">
        {{ item.text }}
      </template>
    </v-select>
    <error-message :errors="fErrors"/>
  </div>
</template>
<script>

import BaseField from '@agtm/nuxt-form/src/base-field'
import ErrorMessage from '@agtm/nuxt-form/src/error-message'

export default {
  name: 'nv-select-image-field',
  components: {ErrorMessage},
  extends: BaseField,

  // Copiado de https://vuetifyjs.com/en/api/v-select/#props
  props: [
    'append-icon',
    'append-outer-icon',
    'attach',
    'autofocus',
    'background-color',
    'cache-items',
    'chips',
    'clear-icon',
    'clearable',
    'color',
    'counter',
    'counter-value',
    'deletable-chips',
    'dense',
    'disable-lookup',
    'disabled',
    'eager',
    'filled',
    'flat',
    'full-width',
    'height',
    'hide-details',
    'hide-selected',
    'hide-spin-buttons',
    'hint',
    'id',
    /**
     * Deve ser um array  de objetos no formato
     * https://vuetifyjs.com/en/api/v-select/#props-items
     * + atributo image
     * {
     *   image: (URL DA IMAGEM)
     * }
     */
    'items',
    'label',
    'light',
    'loader-height',
    'loading',
    'menu-props',
    'messages',
    'multiple',
    'no-data-text',
    'open-on-clear',
    'outlined',
    'persistent-hint',
    'persistent-placeholder',
    'placeholder',
    'prefix',
    'prepend-icon',
    'prepend-inner-icon',
    'readonly',
    'return-object',
    'reverse',
    'rounded',
    'rules',
    'shaped',
    'single-line',
    'small-chips',
    'solo',
    'solo-inverted',
    'success',
    'success-messages',
    'suffix',
    'type',
    'validate-on-blur',
    'value',
    'value-comparator'

  ]

}
</script>


