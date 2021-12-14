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

# Manipulando (filtrando) valores do formulário antes de salvar

O atributo fModel representa o valor do campo no formulário, geralmente esse valor é mapeado diretamente.

Porém, em alguns casos, o valor utilizado internamente no campo precisa ser manipulado antes de ser usado pelo usuário.

Um exemplo, são campos monetários, no campo é exibido o valor com cifrão da moeda enquanto o valor final é um float.
Neste caso não utilizamos fModel diretamente, aplicamos um filtro ao carregar e ao salvar a informação

Os dados do formulário são passados para o campo através do método setValue, então podemos sobrescrever o método setValue, que na base é escrito assim:
Exemplo:

```javascript
 methods: {
    setValue(value) {
      this.fModel = value
    } 
  },
```

Ao reeserver o método, devemos manter a atribuição de fModel com valor vindo do formulário, porém podemos atribuir nossa váriavel:
```javascript
 methods: {
    setValue(value) {
      this.fModel = value
      this.internalValue = transform(this.fModel)
    } 
  },
```

Depois que o valor é alterado pelo campo podemos, mandar novamente para o formulário simplesmente atribuindo fModel
exemplo;

```javascript
 methods: {
    update(value) {
      this.fModel = transform(value)      
    } 
  },
```

Importante destacar q o método update é abritrádio, ao contrario do setValue, não é utilizado pelo Formulário, ele deve ser chamado por exemplo no evento onChange

Dica: existem muitas formas de implementar, estude outros campos já existente
