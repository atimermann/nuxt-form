import {defineNuxtPlugin} from '#app'
import NuxtForm from "../src3/nuxt-form";

// TEMPO DE EXECUÇÃO

export default defineNuxtPlugin(nuxtApp => {
  console.log('Plugin by my-module!')
  nuxtApp.vueApp.component('NuxtForm', NuxtForm)

})
