## Info

* Manter seguintes modulos instalado em dev, para o websorm reconhecer o vue na inspection (mesmo não sendo usado)
    * vue
    * @nuxtjs/vuetify (nuxt mesmo? ou só o vuetify
      
* Lembrar que todo o atributo criado no field, é necessário adicionar em 
    * src/nuxt-form.vue => Template => <component />


* Quando possível implementar métodos tanto no formulário quanto nos campos. 
  * Exemplo: Método para limpar dados do formulário, criar método clean no baseField e no form, quando executar no form chama clean dos fields
