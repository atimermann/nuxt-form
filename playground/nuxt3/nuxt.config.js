import { defineNuxtConfig } from 'nuxt'
import NuxtForm3 from '../../nuxt/nuxt3'

export default defineNuxtConfig({
  vite: {
    logLevel: 'info',
    clearScreen: false, // não funciona, utilizar  "nuxt dev --no-clear", (não documentado) https://github.com/nuxt/framework/issues/2281#issuecomment-1048630429
    server: {
      // port: 8000 (Configuração de porta não funciona, alterar no package.json: utilizar nuxt dev --port=5678 (verificar novas versões do nuxt)
    }
  },
  modules: [
    [NuxtForm3, { addPlugin: true }]
  ]
})
