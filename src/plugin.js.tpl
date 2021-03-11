/**
 * **Created on 05/03/2021**
 *
 * src/plugin.js
 * @author André Timermann <andre@timermann.com.br>
 *
 */
'use strict'

import Vue from 'vue'
import PluginLoader from '@agtm/nuxt-form/src/plugin-loader'

const options = {
  debugger: <%= options.debugger %>,
  nuxtI18n: <%= options.nuxtI18n %>,
  language: '<%= options.language %>'
}

PluginLoader(Vue, options)
