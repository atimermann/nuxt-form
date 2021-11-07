## Criando um campo Customizado

* TODO: Tomar cuidado para não sobrescrever uma prop do BaseField, como errors
* TODO: Adicionar componente <error-message :errors="fErrors"/> para imprimir mensagens de erro padrão
* TODO: explicar metodos touch e blur

Podemos criar campos customizado tanto específico para o projeto ou estander o nuxt-form com novos campos. Esta 
documentação abrange os dois casos.

A Única diferença é que no nuxt-form deve ser salvo no diretório "src/fields" e seguir a convenção de nome:

Para campos utilizando vuetify

    nv-[NOME DO CAMPO]-field.vue

Dentro do projeto criamos o componente em qualquer local e importamos 

## Modelo Básico

```vue

<template>
  <div class="pb-3">
    <v-text-field
        v-model="fModel"
        v-bind="$props"
        :error="!!fErrors.length"
        @keydown="touch"
        @blur="blur"
    />
    <error-message :errors="fErrors"/>
  </div>
</template>
<script>

import BaseField from '@agtm/nuxt-form/src/base-field'
import ErrorMessage from '@agtm/nuxt-form/src/error-message'

export default {
  name: 'nv-text-field',
  components: {ErrorMessage},
  extends: BaseField  
}
</script>

```

### Pontos importantes:

* Todo campo deve estender BaseField
* Podemos utilizar alguns compoenentes auxiliares para implementar lógicas repetitivas, atualmente disponível:
    * error-message: Impressão de mensagem de erro fornecido por fErrors
* BaseField adiciona alguns mixins importante:
    * Debugger: Ativa depuração
    * validator: validação do campo utilizando biblioteca validator
* Necessário chamar os métodos touch e blur
    

## Atributos disponíveis

### fieldname
Retorna nome do campo (pode ter sido definido via schema, no template("field-name") ou no model)

### fErrors
Lista de todos os erros do campo, concatena erros externos quanto externos carregados pelo validator  

### fModel
Valor do campo
Ele é alterado pelo formulário ou no modo stand-alone quando v-model é alterado

# Validação



# Validação Customizada



