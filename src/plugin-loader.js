/**
 * **Created on 06/03/2021**
 *
 * src/plugin-loader.js
 * @author André Timermann <andre@timermann.com.br>
 *
 */
'use strict'

import NuxtForm from './nuxt-form'
import path from 'path'

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

  Vue.component('nuxtForm', NuxtForm)

  // Carrega automaticamente todos os fields e declara no vue
  for (let [moduleName, module] of Object.entries(modulesCache)) {

    const metaMixin = {
      data: function () {
        return {
          META_MODULENAME: moduleName,
          META_FILENAME: `@agtm/nuxt-form/src/fields/${moduleName}.vue`,
          options
        }
      },

    }

    if (module.mixins) {
      module.mixins.push(metaMixin)
    } else {
      module.mixins = [metaMixin]
    }

    Vue.component(moduleName, module)

  }
}

