# nuxt-form

Nuxt Form tem como objetivo, facilitar a criação de formulários no nuxt(vue), simplificando e automatizando muitas
tarefas repetitivas.

## Conceitos chaves

O Nuxt form é composto por dois compoenentes principais:

    Formulário (Form) e Campos (Field)

## Caracteristicas

As principais caractéristicas do Nuxt Form são:

* Integração completa com Nuxt
* Integração com vuetify (a princípio) (se necessário adicionar outras bibliotecas no futuro)
* i18n
* Permitir criar formulários inteiros rapidamente através de uma descrição resumida em objetos ou json.
* Ser flexivel permitindo criar qualquer tipo de formulário com qualquer tipo de campo, com minimo de restrições.
* Modular, permite criar campos customizado facilmente (todos os campos são módulos do form)
* Permitir usar campos individualmente, sem necessidade de instanciar um novo form aproveitando funcionalidades como
  máscara, validação entre outros...
* Permitir gerar um formulário rapidamente através do schemas(json/objeto/nuxt-model) e com o tempo customiza-lo.
* Funções comuns de formulários:
    * Validação (por campo e global)
    * Máscara
    * Habilitar/Desabilitar formulário
    * Foco em campo específico
    * loading (ex: aguardar submit)
* Filtros de dados ()
* Models Inteligente (Objeto que representa os dados do formulário)
    * Models aninhado (possibilidade de vincular um campo umatributo aninhado vários niveis dentro)
    * Integração com nuxt-model (em vez de passar um schema, lê o schema diretamente da class do Nuxt Model)

## Documentação

Para devs: Manter esta documentação sempre atualizada com exemplos e refêrencias.

## Instalação

Instale o seguinte pacote:

```bash
  npm install @agtm/nuxt-form
```

Adicione no arquivo nuxt.config.js:

```bash
modules: [
  [
    '@agtm/nuxt-form/nuxt',
    {
      nuxtI18n: true,
      language: 'pt-BR',
      debugger: false
    }
  ]
],
```

Com isso os componentes do nuxt-form já estarão disponiveis globalmente não havendo necessidade de importar novamente.

## Primeiros passos

Para criar um formulário basta utilizar a tag nuxt-form como no exemplo:

```vue

<template>
  <nuxt-form v-model="formData">
    <nv-text-field
        field-name="name"
    />
    <nv-text-field
        field-name="lastname"
    />
  </nuxt-form>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        name: 'André'
      }
    }
  }
}
</script>
```

* Neste exemplo também criamos dois campo do tipo "caixa de texto" simples com nome "name" e "lastname".
* Atributo "field-name" é obrigatório para que o formulário consiga identifica-lo
* Os valores de todos os campos são acessados via "v-model" que é um atributo bidirecional.
* Veja que definimos valores iniciais para o campo "name"

Podemos alterar os valores do formulário posteriormente (por exemplo depois de uma consulta) há qualquer momento, para
isto basta alterar "formData" que o formulário será atualizado imediatamente.

**Importante:** Todos os dados do formulários existentes serão perdidos. Para alterar alguns campos, utilize o método
setModel via ref

## Modo Stand Alone

É possivel utilizar os campos isoladamente, independente do formulário e aproveitando algumas de suas funcionalidades
como validação e máscara, muito útil em alguns cenários:

```vue

<template>
  <nv-text-field
      v-model="standalone"
  />
</template>

<script>
export default {
  data() {
    return {
      standalone: 'stand_alone',
    }
  }
}
</script>
```

Notas:

* Não é obrigatório definir "field-name" nestes casos
* utilize v-model para acessar os dados do componente, como seria feito em input padrão do vue.
* Não há necessidade de utilizar "v-model" em campos quando estiver utilizando nuxt-form (modo completo)

## Schemas

Existem três modos de criar campos no "nuxt-form": via schema, slots ou nuxt-model.

Schemas são objetos no formato json que descreve todos os campos de um formulário, como nome, tipo, validação entre
outros.

Por exemplo:

```javascript
// TODO: Melhorar exemplo mais tarde, com mais atributos e tiṕo de campo
[
  {
    fieldName: 'name',
    fieldType: 'nv-text-field'
  },
  {
    fieldName: 'Name2',
    fieldType: 'nv-text-field'
  },
  {
    fieldName: 'Name3',
    fieldType: 'nv-text-field',
    validators: ['required', this.validation]
  }
]

```

* No exemplo acima descrevemos 3 campos name, name2 e name3, do tipo texto simples
* fieldName mapeia o nome do atributo definido no modelo (v-model) diretamente, então fieldName é importante para acesso
  aos dados
* Schema foi criado tendo em mente velocidade de desenvolvimento, portanto todos os campos serão renderizados um embaixo
  do outro de forma simples. Para posicionar os campos ou criar layouts mais complexos utilize slots

Exemplo completo:

```vue

<template>
  <nuxt-form :schema="schema" v-model="formData"/>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      schema: [
        {
          fieldName: 'name',
          fieldType: 'nv-text-field'
        },
        {
          fieldName: 'Name2',
          fieldType: 'nv-text-field'
        },
        {
          fieldName: 'Name3',
          fieldType: 'nv-text-field',
          validators: 'required'
        }
      ]
    }
  }
}
</script>

```

Schema sempre deve estar no formato array, permitindo ordenar os campos conforme desejado

## Slots

Outro modo de definir os campos do formulário é através de slots e pode ser feito de duas maneiras:

* slot default
* slot nomeado

Através de slots podemos utilizar campos customizados criado apenas no seu projeto.

Um exemplo de slot default é o exemplo mostrado no começo deste tutorial:

```vue

<template>
  <nuxt-form v-model="formData">
    <nv-text-field
        field-name="name"
    />
    <nv-text-field
        field-name="lastname"
    />
  </nuxt-form>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        name: 'André'
      }
    }
  }
}
</script>
```

## Modo Misto

Podemos criar no mesmo formulário, campos via schema ou via slots, desta forma podemos criar formulários rapidamente com
esquema e no decorrer do projeto, graduamente, ir melhorando a implementação e substituíndo por campos definidos via
slot.

Por exemplo:

```vue

<template>
  <nuxt-form :schema="schema" v-model="formData">
    <nv-text-field
        field-name="Name2"
    />
  </nuxt-form>
</template>

<script>

export default {
  data() {
    return {
      formData: {},
      schema: [
        {
          fieldName: 'name',
          fieldType: 'nv-text-field'
        },
        {
          fieldName: 'Name2',
          fieldType: 'nv-text-field'
        },
        {
          fieldName: 'Name3',
          fieldType: 'nv-text-field'
        }
      ]
    }
  }
}
</script>
```

* Observe o campo "name2" ele é definido tanto no schema quanto no slot, neste caso a versão do slot tem precedencia, e
  o campo definido no schema é ignorado.

## Slots Nomeados

Campos definidos via slot são renderizado acima dos campos definidos via schema, ou seja, se você criar um novo campo
via slot a ordem de renderização será modificada.

* Para não alterar a ordem definida via schema, podemos utilizar slots nomeados, que são renderizados na mesma posição
  definda em schema.
* Porém, slots nomeados só funcionam se estiverem definidos em schemas, apenas o atributo fieldName no schema será
  aproveito, o restante será excluido.

Exemplo:

```vue

<template>
  <nuxt-form :schema="schema" v-model="formData">
    <template #Name3>
      <nv-text-field
          field-name="Name3"
      />
    </template>
  </nuxt-form>
</template>
<script>
export default {
  data() {

    return {
      formData: {},
      schema: [
        {
          fieldName: 'Name1',
          fieldType: 'nv-text-field'
        },
        {
          fieldName: 'Name2',
          fieldType: 'nv-text-field'
        },
        {
          fieldName: 'Name3',
          fieldType: 'nv-text-field'
        },

      ]
    }

  }
}
</script>

```

## Nuxt Model

O Nuxt Form tem integração com o Nuxt Model, podemos passar uma instancia de Model e gerar o form será gerado
automaticamente à partir desse Model, além de manpilar dados do model.

Exemplo de uso:

```javascript
// aluno.model.js

import {Model} from '@agtm/nuxt-model'

export default class AlunoModel extends Model {
  static nameType = {
    type: 'string',
    fieldType: 'nv-text-field'
  }
}
```

* Se alterarmos do tipo do atributo destring para objeto podemos definir ali qualquer atributo que seria defino no
  schema

```vue

<template>
  <div>
    <nuxt-form v-model="aluno" style="border: solid 1px">
    </nuxt-form>
    <v-btn @click="check">Check Model</v-btn>
  </div>
</template>

<script>
import AlunoModel from "@/models/aluno.model";

export default {
  data() {
    return {
      aluno: null
    }
  },
  created() {
    this.aluno = AlunoModel.create({name: 'João'})
    this.check()
  },
  methods: {
    check() {
      this.aluno.name = 'Maria'
    }
  }
}
</script>
```

* Note que além do Model ser usado em substituição do Schema, ele também é usado em substituição de v-model.
* A regra de prioridade de atributos do field é SLOT => SCHEMA => MODEL portanto é possivel sobrescrever atributos do
  model com schema ou slots.

### Impedir que um campo do Model seja renderizado no formulário

Para não renderizar um campo no formulário use o atributo "hide" no schema:

```javascript
{
  data()
  {
    return {
      schema: [
        {
          fieldName: 'id',
          hide: true
        }
      ]
    }
  }
}
```

## Objetos Aninhados

Imagine a seguinte objeto de dados:

```json
{
  "personal": {
    "name": "André"
  },
  "externo": [
    1,
    2,
    3,
    4
  ]
}
```

Agora imagine que você precise criar um campo para editar apenas o atributo "nome" dentro do objeto "personal" e não
diretamente  "personal"

Isso é feito facilmente definindo o nome do campo como "personal.name".

exemplo:

```vue

<template>
  <nuxt-form :schema="schema" v-model="formData">
    <nv-text-field
        field-name="personal.name"
    />
  </nuxt-form>
</template>

<script>

export default {
  data() {
    return {
      formData: {},
      schema: [
        {
          fieldName: 'personal.lastname',
          fieldType: 'nv-text-field'
        }
      ]
    }
  }
}
</script>
```

* Desta forma apenas o atributo filho será alterado diretamente.
* Se personal não estiver definido no modelo, então será criado automaticamente.

## Acessando Métodos e atributos do formulários através de Ref

Para acessarmos os métodos do nuxt-form utilizamos "ref" como no exemplo abaixo:

```vue

<template>
  <div>
    <v-card>
      <v-container>
        <nuxt-form :schema="schema" v-model="formData" ref="form" @submit="submit">
        </nuxt-form>
        <v-btn @click="$refs.form.submit()">SUBMIT</v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {

  mounted() {
    setTimeout(() => {
      this.$refs.form.setValues({name: 'André'})
    }, 3500)
  },
  data() {
    return {
      formData: {},
      schema: [
        {
          fieldName: 'lastname',
          fieldType: 'nv-text-field',
        }
      ]
    }
  },
  methods: {
    submit(valid, values, fields) {
      this.$refs.form.clearErrors()
      this.$refs.form.setErrors(['Erro Global'])
    }
  }
}
</script>
```

## Validação

Validações são implementadas internamente no nuxt-form (utilizando o modulo validator) e também podem ser fácilmente
customizadas.

Portando, podemos validar os campos de várias maneiras:

### Validação Interna

São validações comuns implementadas internamente no nuxt-form, para definir uma validação interna simplemente defina o
atributo "validators":

**Exemplos:**

```vue

<template>
  <nv-text-field
      field-name="name"
      validators="required"
  />
</template>
```

Caso queira mais de uma validação no mesmo campo:

```vue

<template>
  <nv-text-field
      field-name="name"
      :validators="['required', 'mustBeEmpty']"
  />
</template>
```

Se quisermos passar atributos para essa validação:

```vue

<template>
  <nv-text-field
      field-name="name"
      :validators="{validator: 'equal', options: {field: 'password', otherLabel: 'Confirme a Senha'}}"
  />
</template>
```

E por fim, podemos passar funções, veja mais detalhes em "validações Customizadas"

Caso esteja utilizando um schema, pode configurar validações da seguinte forma:

```javascript

export default {
  data() {
    return {
      schema: [
        {
          fieldName: 'lastname',
          fieldType: 'nv-text-field',
          validators: ['required', this.validation]
        }
      ]
    }
  }
}
```

### Validação Customizada

Para criar uma validação customizada, basta passar uma função no atributo "validators" do campo da seguinte forma:

```javascript

export default {
  data() {
    return {
      schema: [
        {
          fieldName: 'lastname',
          fieldType: 'nv-text-field',
          validators: this.myValidation
        }
      ]
    }
  },

  methods: {
    myValidation(value, model) {
      return {valid: true}
    }
  }
}
```

A função criada terá os seguintes argumentos:

| Argumento | Descrição                                                                                                                                                                   | Tipo   |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| value     | Valor do campo no qual queremos validar                                                                                                                                     | Any    |
| model     | Uma cópia do model do form, ou seja podemos acessar valores de qualquer outro campo. Exemplo: verificar se a senha preenchida pelo usuário em outro campo é idêntico a este | Object |

**IMPORTANTE:** Validações podem ser assincronas (adicionar async na função customizada).

** NOTA: ** Se utilizar a biblioteca validator, é necessário converter para string o valor recebido antes de validar

O mais importante é agora é o retorno, deve ser um objeto representando o resultado da validação e deve estar
necessáriamente no seguinte formato:

#### Campo validado com sucesso:

```javascript
return {valid: true}
```

#### Campo não válidado:

```javascript
return {valid: false, error: 'VALIDATOR_REQUIRED'}
```

Note que além do status da validação, precisamos retornar uma mensagem de erro para ser exibida no formulário exatamente
abaixo do campo inválido.

Porém, o que deve ser retornado em "error" é uma plavra-chave que represente a chave no arquivo de tradução. Veja mais
detalhes em nuxt-i18n e vue-i18n, exceto se o modo internacionalização esteja desativado, neste caso é possível retornar
a mensagem de erro diretamente

No exemplo acima 'VALIDATOR_REQUIRED' será traduzido para "campo obrigatório", caso o idioma esteja definido para pt-BR.

#### Mensagem de erro com váriaveis na tradução

Seguindo o nuxt-i18n, você pode utiizar váriaveis na tradução como no exemplo abaixo:

```javascript
return {valid: false, error: 'VALIDATOR_EQUAL', errorValues: {same: model.otherLabel}}
```

#### Requisitar validação de outro campo

Em alguns casos, pode ser interessante sempre que este campo for validado, validar outros campo, como por exemplo na
criação de nova senha, onde existe um segundo campo relacionado para confirmar senha. Para isso utilize o atributo "
validate":

```javascript
equal(value, model)
{
  const valueA = value || ''
  const valueB = model['confirmPassowrd'] || ''

  return valueA === valueB
    ? {valid: true, validate: 'confirmPassword'}
    : {valid: false, error: 'Campo inválido', validate: 'confirmPassword'}
}
```

### Validação de Campo

Existem alguns tipos de campos, que requerem validações especiais que só servem pra este campo em específico. Neste caso
a validação é implementada diretamente na implementação do campo customizado.

Segue as mesmas regras de validação customizada.

Leia mais na sessão: "Criando campos Customizados"

### Validação Global

Em alguns casos, precisamos criar validações mais customizadas, exclusiva para o nosso formulário como um todo.

Por exemplo, caso o campo A do formulário for maior que 10, e o campo B estiver verdadeiro, então validar campo C

Para estes casos, o trabalho será manual, podemos criar um código de validação e manipular as mensagens de erros logo
depois do evento submit do formulário.

Exemplo:

```vue

<template>
  <nuxt-form :schema="schema" ref="form" @submit="onSubmit"></nuxt-form>
</template>
<script>
export default {
  methods: {
    onSubmit(valid, values, fields) {

      if (valid) {
        /* NOSSA LOGÌCA DE VALIDAÇÂO AQUI*/


        if (error) {
          // Mensagem de erro em um campo
          fields.fieldA.setErrors('Campo inválido')

          // Mensagem de erro global
          this.$refs.form.addError('Este formulário tem um problema')
        } else {
          /* ENVIA DADOS PARA O BACKEND */
        }
      }
    }
  }
}

</script>
```

Outro exemplo muito comum, são erros vindo do backend, que deverão ser setados no formulário por aqui.

### Modos de validação

A validação no formulário pode funcionar de diferentes maneiras. Podemos configura-la através da prop "validationMode".

Isso pode ser feito tando ao criar formulário ou ao criar um campo no modo standalone. Tempos 5 tipos para o modo
formulário e 3 tipos para o modo standalone.

No modo formulário podemos ter:

| Modo              | Descrição                                                                                                                                                |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| onChange          | Validação é executada sempre que o valor de um campo é alterado, validação em tempo real. Pode ser lento para formulários grandes.                       |
| onBlur            | Validação é executada sempre que um campo perde o foco                                                                                                   |
| onBlurOrInvalid   | Validação é executada sempre que um campo perde o foco ou quando esta inválido (ou seja, em tempo real para remover mensagem de erro antes possível)     |
| onSubmit          | Validação só é executada quando usuário submeter o formulário (Mais rápido, usa pouco processamento, útíl em formulários com muitos campos)              |
| onSubmitOrInvalid | Validação é executada quando usuário submete o formulário ou quando está inválido. (ou seja, em tempo real para remover mensagem de erro antes possível) |

No modo standAlone teremos apenas os modos **onChange, onBlur e onBlurOrInvalid**

## TODO: Debugger

## TODO: Refêrencia de campos


## TODO: i18n

-TODO: Criar arquivos com traduções padrão, para ser mesclado pelo usuario no i18n, porém usuario deve fazer
manualmente,explicar como

# Rêferencias

## Opções do Módulo

| Atributo | Descrição                                                                                                                                                                                                                                                                 | Padrão  |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| debugger | Modo depuração, exibe borda vermelha nos componentes internos e exibe informações sobre componentes.                                                                                                                                                                      | true    |
| nuxtI18n | Habilita suporte ao plugin do nuxt: nuxt-i18n deve estar instalado no projeto, veja documentação em: https://pt.nuxtjs.org/docs/2.x/get-started/installation Necessário carregar arquivos de tradução do formulário em seu projeto localizado em @agtm/nuxt-form/src/lang | false   |
| language | Idioma utilizado caso não queira utilizar o modulo "nuxt-i18n". Caso precise da funcionalidade de idioma dinâmico necessário utilizar o "nuxt-i18n". Por enquanto apensar idioma pt-BR está disponível                                                                    | 'pt-BR' |

Table Editor: https://www.tablesgenerator.com/markdown_tables

## Props

| Prop                        | Tipo                             | Padrão   | Descrição                                                                                                                                                                                                                                                                                                                                               |
|-----------------------------|----------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| schema                      | Array                            | []       | Descreve os campos do formulário (formato json) mapeia campo com dado.                                                                                                                                                                                                                                                                                  |
| value                       | Object \|\| InstanceOf NuxtModel | {}       | Representa os dados de todos os campos do formulário, obrigatório ser objeto ou instancia de nuxt-model                                                                                                                                                                                                                                                 |
| validationMode              | String                           | onChange | Modo de validação onChange, onBlur, onBlurOrInvalid, onSubmit, onSubmitOrInvalid                                                                                                                                                                                                                                                                        |
| disableFieldsUpdateByVModel | Boolean                          | true     | Por padrão ao alterar valor de v-model, todos os campos tem seus valores sincronizados com model do formulário  Porém, isto causa um efeito colateral, sempre que um campo altera seu valor,  todo  formulário é atualizado novamente, podendo causar lentidão em formulários muito grande.  Utilize esta opção para melhorar performance nesses casos. |
| cleanNullValuesOnSubmit     | Boolean                          | true     | Ao carregador valores dos campos ou ao submeter formulário, atributos com valor null, undefined ou objeto vazio {}, são removidos do resultado final.                                                                                                                                                                                                   y|

## TODO: Eventos

## Métodos

### clearErrors

Limpa todas as mensagens de erros customizados no campo e erros definidos globalmente

**IMPORTANTE:** Não limpa erros de validações internas (ex: required)

### isValid

Verifica se o formulário é válido

**IMPORTANTE:** Não valida formulário, simplesmente retorna o resultado da última validação. Se tiver utiizando o modo "
submit" ou "onSubmit" será necessário executado o método "validate()" antes.

**Retorno** (boolean) Se formulário está válido ou não

### setErrors

Atribui mensagens de erros globais, limpa mensagens de erros antigos.

| Parâmetro | Descrição                      | Tipo     | 
|-----------|--------------------------------|----------|
| errors    | Lista de mensagens de erro     | String[] |

### addErrors

Adiciona uma menagem de erros global, adiciona um erro sem limpar erros atigos

| Parâmetro | Descrição             | Tipo   | 
|-----------|-----------------------|--------|
| errors    | Mensagem de erro      | String |

### setValues

Atribui valores aos campos do formulário (model). Só altera os campos definidos em "values" ao contrário de alterar
v-model que limpa os valores de todos os campos antes de atrabituir (substitui).

| Parâmetro | Descrição                                        | Tipo   | 
|-----------|--------------------------------------------------|--------|
| values    | Objeto com nome do campo e valor a ser atribuido | Object |

**Retorno:** void

### submit

Utilizado quando se deseja submeter os dados do formulário, esta operação, executa validação completa e disapara o
evento "submit"

Por exemplo, ao submeter o formulário para o backend, execute o metodo submit() e no evento submit, verificamos
validação dos campos, realizamos validações extras.

### (async) validate

Executa validação do formulário

| Parâmetro       | Descrição                                                                                                                                                | Tipo     | Padrão          |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| fieldsName      | Lista com nome dos campos que serão validados                                                                                                            | String[] | Todos os campos |
| validatedFields | Lista de nome de campos que já foram validados. Usado internamente, quando o campo A requisita validação de B e B requisita de A, evita "loop infinito". | string[] | []              |

**Retorno:** void (Utilize o método "isValid", para saber se o formulário está válido)

## Métodos de Campos

Para ter acesso a estes métodos. necessário te a lista de componentes do formulário, isso pode ser feito através do
evento "submit".

Veja mais detalhes no evento submit

### setErrors

Define todas as mensagens de erro customizada para este campo. Erros de validações internas são mescladas com esta
lista. Usado principalmente em conjunto com o evento "submit" para criar validações customizadas ou criar mensagem de
erros vindo do backend

**NOTA:** Também é possível pode manipular lista de erros através da prop "errors" do campo (quanto componente é
definido via slots)




* [Criando novos campos](./docs/createField.md)
