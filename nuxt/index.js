/**
 * **Created on 05/03/2021**
 *
 * src/index.js
 * @author André Timermann <andre@timermann.com.br>
 *
 *  Módulo para ser carregado no Nuxt
 *
 */
'use strict'

import path from 'path'
import { defaults } from 'lodash'

export default function NuxtModelModule(optionsModule) {


  const options = defaults(optionsModule, {
    /**
     * Habilita suporte ao nuxt-i18n
     */
    nuxtI18n: false,
    /**
     * Idioma quando nuxtI18n estiver desativado.
     */
    language: 'pt-BR',
    /**
     * Modo Depuração (ambiente dev)
     */
    debugger: true
  })

  this.addPlugin({src: path.resolve(__dirname, '..', 'src', 'plugin.js.tpl'), options})
}

// OBRIGATÓRIO se publicar o módulo como pacote npm
module.exports.meta = require('../package.json')
