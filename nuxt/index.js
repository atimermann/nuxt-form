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

export default function NuxtModelModule(optionsModule) {
  this.addPlugin(
    {
      src: path.resolve(__dirname, '..', 'src', 'plugin.js')
    }
  )

}

// OBRIGATÓRIO se publicar o módulo como pacote npm
module.exports.meta = require('../package.json')
