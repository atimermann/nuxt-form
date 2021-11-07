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

    //TODO: value ||= '' incompativel com nuxt, aguardar e alterar quando atualizar
    if (value === undefined || value === null) {
      value = ''
    }
    value += ''
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
      ? {valid: true, validate: options.field}
      : {valid: false, error: 'VALIDATOR_EQUAL', errorValues: {same: options.otherLabel}, validate: options.field}
  }
}
