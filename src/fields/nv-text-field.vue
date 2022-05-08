<template>
  <div class="pb-3">
    <v-text-field
        v-model="fModel"
        v-bind="$props"
        v-on="$listeners"
        :error="!!fErrors.length"
        @keydown="touch"
        @blur="blur"
    />
    <error-message :errors="fErrors"/>
  </div>
</template>
<script>

import BaseField from '../base-field'
import validatorLibrary from "validator";
import ErrorMessage from "../error-message";

export default {
  name: 'nv-text-field',
  components: {ErrorMessage},
  extends: BaseField,

  props: {
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
    label: String,
    outlined: Boolean,
    placeholder: String,
    prefix: String,
    prependInnerIcon: String,
    reverse: Boolean,
    disabled: Boolean,
    rounded: Boolean,
    shaped: Boolean,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text',
    },
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

  // TODO: Remover ao documentar
  validators: {
    mustBeEmpty(value, model, options) {
      value = value || ''
      return !validatorLibrary.isEmpty(value, options)
          ? {valid: true}
          : {valid: false, error: 'VALIDATOR_DEFAULT'}

    }
  }
}
</script>
