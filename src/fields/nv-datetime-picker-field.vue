<template>
  <div>
    <v-datetime-picker
        v-model="internalDate"
        @blur="blur"
        @input="update"
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
 *      https://moment.github.io/luxon
 *
 *
 *
 * NOTA: v-datetime-picker utiliza internamente date-pickers e time-pickers do vuetify
 *
 * TODO: Prop para configuração de icone
 *
 */
import BaseField from '@agtm/nuxt-form/src/base-field'
import ErrorMessage from '@agtm/nuxt-form/src/error-message'
import {DateTime} from 'luxon'

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
    /**
     * Define o timezone do campo (em vez de utilizar timezone do navagador), deve estar no formato
     * ex: America/New_York
     */
    timezone: String,
    disabled: Boolean
  },

  data() {
    return {
      /**
       * Representação interna da data, importante, timezone representado aqui é incorreto, é feito uma adaptação para
       * forçar o uso de timezone diferente do sistema
       */
      internalDate: undefined,
      /**
       * Timezone usado internamente, permitindo alteração em tempo real com watch
       */
      internalTimezone: this.timezone
    }
  },

  watch: {
    /**
     * Atualiza valores para novo timezone especificado em props
     * @param value
     */
    timezone(value) {
      this.internalTimezone = value
      this.setValue(this.fModel)
    }

  },

  methods: {

    setValue(value) {

      this.fModel = value

      if (this.internalTimezone) {
        if (value instanceof Date) {
          // Define o timezone especificado
          const datetime = DateTime.fromJSDate(value, {zone: this.internalTimezone})
          this.internalDate = new Date(datetime.year, datetime.month - 1, datetime.day, datetime.hour, datetime.minute, datetime.second)
        }
      } else {
        this.internalDate = value
      }
    },

    /**
     *
     * @param value {Date}
     */
    update(value) {

      if (value instanceof Date) {
        if (this.internalTimezone) {
          // Converte data para timezone do sistema
          const newDate = DateTime.fromObject({
            year: value.getFullYear(),
            month: value.getMonth() + 1,
            day: value.getDate(),
            hour: value.getHours(),
            minute: value.getMinutes(),
            second: value.getSeconds()
          }, {zone: this.internalTimezone})

          this.fModel = newDate.toJSDate()

        } else {
          this.fModel = value
        }
        this.touch()
      }
    }
  }

}
</script>
