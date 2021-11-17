<template>
  <div class="pb-3">
    <v-datetime-picker
        v-model="fModel"
        @input="touch"
        @blur="blur"
        date-format="dd/MM/yyyy"
        :date-picker-props="{locale:'pt-BR'}"
        :time-picker-props="{format:'24hr'}"
        clearText="Limpar"
        v-bind="$props"
        :error="!!fErrors.length"
    >
      <template slot="dateIcon">
        <v-icon>mdi-calendar</v-icon>
      </template>
      <template slot="timeIcon">
        <v-icon>mdi-clock-outline</v-icon>
      </template>
    </v-datetime-picker>
    <error-message :errors="fErrors"/>
  </div>
</template>
<script>
/**
 * REF: https://github.com/darrenfang/vuetify-datetime-picker
 *      https://vuetifyjs.com/en/components/date-pickers
 *      https://vuetifyjs.com/en/components/time-pickers/
 *
 * NOTA: v-datetime-picker utiliza internamente date-pickers e time-pickers do vuetify
 *
 * TODO: Prop para configuração de icone
 *
 */
import BaseField from '@agtm/nuxt-form/src/base-field'
import ErrorMessage from '@agtm/nuxt-form/src/error-message'


export default {
  name: 'nv-datetime-picker-field',
  components: {ErrorMessage},
  extends: BaseField,

  props: {
    label: String,
    dialogWidth: Number,
    //TODO: dateFormat:	string,
    timeFormat: String,
    //TODO: clearText: String,
    okText: String,
    textFieldProps: Object,
    //TODO:  datePickerProps:	Object,
    //TODO:  timePickerProps:	Object
  }

}
</script>
