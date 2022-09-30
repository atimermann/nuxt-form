/**
 * **Created on 11/08/2022**
 *
 * nuxt/nuxt3.js
 * @author André Timermann <andre@timermann.com.br>
 *
 */

import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import {resolve} from "path";
import {fileURLToPath} from "url";

// Código executado em tempo de compilação

// export default async (inlineOptions, nuxt) => {
//   // You can do whatever you like here..
//   console.log('inlineOptions', inlineOptions) // `123`
//   console.log('nuxt.options.dev', nuxt.options.dev) // `true` or `false`
//   nuxt.hook('ready', async nuxt => {
//     console.log('Nuxt is ready')
//   })
// }

export default defineNuxtModule({
  meta: {
    // Usually  npm package name of your module
    name: '@agtm/nuxt-form',
    // The key in `nuxt.config` that holds your module options
    configKey: 'nuxt-form',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options for your module
  defaults: {},
  hooks: {},
  async setup(moduleOptions, nuxt) {

    console.log('SETUP START HERE')
    console.log('moduleOptions', moduleOptions) // `123`
    console.log('nuxt.options.dev', nuxt.options.dev)

    const runtimeDir = fileURLToPath(new URL('../src3', import.meta.url))
    console.log(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugin'))

  }
})
