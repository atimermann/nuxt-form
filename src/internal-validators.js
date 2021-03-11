/**
 * **Created on 08/03/2021**
 *
 * src/internal-validators.js
 *
 * @author André Timermann <andre@timermann.com.br>
 *
 *   Validações incluídas (Pre-buiit valorations)
 *
 */
'use strict'

import validatorLibrary from 'validator'

export default {

  required(value, model, options) {

    value ||= ''
    return validatorLibrary.isEmpty(value, options)
      ? {valid: false, error: 'VALIDATOR_REQUIRED'}
      : {valid: true}
  },

  /**
   * Verifica se um campo é idêntico a outro
   *
   * Ex: campos de senha
   *
   */
  equal(value, model, options) {

    const valueA = value || ''
    const valueB = model[options.field] || ''

    return valueA === valueB
      ? {valid: true}
      : {valid: false, error: 'VALIDATOR_EQUAL', errorValues: {same: options.otherLabel}}
  }
}
