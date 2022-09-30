/**
 * **Created on 06/03/2021**
 *
 * src/plugin-loader.js
 * @author André Timermann <andre@timermann.com.br>
 *
 */
'use strict'

import path from 'path'

/// //////////////////////////////////////////////
// Dependência dos fields
/// //////////////////////////////////////////////
// Vuetiy Datetime Picker
import DatetimePicker from 'vuetify-datetime-picker'

// Vue Curremcy Input
import VueCurrencyInput from 'vue-currency-input'

// VuePhoneNumberInput - TODO: alterar CSS para ficar parecido com o material (vuetify)
import VuePhoneNumberInput from 'vue-phone-number-input'
import NuxtForm from './nuxt-form'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

/// //////////////////////////////////////////////
const fields = require.context('./fields/', false, /\.vue$/)

// Importação Dinamica de todos os modulos de um diretório
// Ref: https://webpack.js.org/guides/dependency-management/
const modulesCache = {}
fields.keys().forEach((resolve, keys, id) => {
  const moduleFileName = path.basename(resolve)
  const moduleName = path.basename(resolve, '.vue')
  modulesCache[moduleName] = require('./fields/' + moduleFileName).default
})

export default function (Vue, options) {
  /// //////////////////////////////////////////////
  // Dependência dos fields
  /// //////////////////////////////////////////////

  // Vuetiy Datetime Picker
  // (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'
  Vue.use(DatetimePicker)

  // Vue Curremcy Input
  Vue.use(VueCurrencyInput)

  // VuePhoneNumberInput
  Vue.component('VuePhoneNumberInput', VuePhoneNumberInput)

  /// //////////////////////////////////////////////
  // Nuxta Form
  /// //////////////////////////////////////////////

  NuxtForm.mixins.push({ options })
  Vue.component('NuxtForm', NuxtForm)

  // Carrega automaticamente todos os fields e declara no vue
  for (const [moduleName, module] of Object.entries(modulesCache)) {
    const metaMixin = {
      data: function () {
        return {
          META_MODULENAME: moduleName,
          META_FILENAME: `@agtm/nuxt-form/src/fields/${moduleName}.vue`,
          options
        }
      }
    }

    if (module.mixins) {
      module.mixins.push(metaMixin)
    } else {
      module.mixins = [metaMixin]
    }

    Vue.component(moduleName, module)
  }
}
