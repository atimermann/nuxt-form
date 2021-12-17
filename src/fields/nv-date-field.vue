<template>
  <div class="pb-3">
    <v-menu
        ref="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="formattedDate"
            :label="label"
            :error="!!fErrors.length"
            prepend-icon="mdi-calendar-month"
            readonly
            hide-details
            v-bind="attrs"
            outlined
            dense
            v-on="on"
            @blur="blur"
        />
      </template>
      <v-date-picker
          v-model="dataPickerModel"
          no-title
          scrollable
          :locale="locale"
          @change="$refs.menu.save()"
      >
        <v-btn v-if="clearButton" text color="primary" @click="clear">
          Limpar
        </v-btn>
      </v-date-picker>
    </v-menu>
    <error-message :errors="fErrors"/>
  </div>
</template>
<script>
/* eslint-disable */
// TODO: Traduzir botão limpar (ver como fazer)
// TODO: Remover Moment-timezone e trocar por luxon

import BaseField from '@agtm/nuxt-form/src/base-field'
import ErrorMessage from '@agtm/nuxt-form/src/error-message'
import {cloneDeep} from 'lodash'
import moment from 'moment-timezone'
import validatorLibrary from 'validator'
import {DateTime} from "luxon";

export default {
  name: 'NvDateField',
  components: {ErrorMessage},
  extends: BaseField,

  props: {
    label: {
      type: String
    },

    locale: {
      type: String,
      default: 'pt-BR'
    },
    /**
     * Exibe botão para limpar dados do campo
     */
    clearButton: {
      type: Boolean,
      default: true
    },

    dateFormat: {
      type: String,
      default: 'L'
    },
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

  computed: {
    dataPickerModel: {
      get: function () {
        if (this.internalDate) {
          const dateTime = cloneDeep(this.internalDate)
          const date = this.removeTimeAndTimezone(dateTime)
          return moment(date).format('YYYY-MM-DD')
        }
      },
      set: function (newValue) {

        if (newValue) {
          this.internalDate = moment(newValue)
              .set('hour', 23)
              .set('minute', 59)
              .set('second', 59)
              .toDate()
        } else {
          this.internalDate = newValue
        }

        this.update(this.internalDate)
      }
    },
    formattedDate() {
      if (this.internalDate) {
        const dateTime = cloneDeep(this.internalDate)
        const date = this.removeTimeAndTimezone(dateTime)
        return moment(date).lang(this.locale).format(this.dateFormat)
      }
    }
  },

  methods: {
    async clear() {
      this.touch()
      this.$refs.menu.save()
      this.fModel = undefined
      this.update(this.fModel)

    },

    removeTimeAndTimezone(date) {
      return moment(date)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .toDate()
    },

    setValue(value) {

      this.fModel = value

      if (this.internalTimezone) {
        if (this.fModel instanceof Date) {
          // Simula o timezone local, usando timezone definido pelo usuário
          const datetime = DateTime.fromJSDate(this.fModel, {zone: this.internalTimezone})
          this.internalDate = new Date(datetime.year, datetime.month - 1, datetime.day, datetime.hour, datetime.minute, datetime.second)
        }
      } else {
        this.internalDate = this.fModel
      }
    },

    /**
     *
     * @param value {Date}
     */
    update(value) {

      if (value instanceof Date) {
        // Converte data para timezone do sistema
        const newDate = DateTime.fromObject({
          year: value.getFullYear(),
          month: value.getMonth() + 1,
          day: value.getDate(),
          hour: 23,
          minute: 59,
          second: 59
        }, {zone: this.internalTimezone || 'local'})

        this.fModel = newDate.toJSDate()

      } else {
        this.fModel = value
      }

      this.touch()
    }
  },


  validators: {
    /**
     * Precisamos reescrver a validação required, necessário converter para string
     */
    required(value, model, options) {

      value = (value && value.toString)
          ? value.toString()
          : ''

      return !validatorLibrary.isEmpty(value, options)
          ? {valid: true}
          : {valid: false, error: 'VALIDATOR_REQUIRED'}

    }
  }
}
</script>
