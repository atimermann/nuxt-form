# nuxt-form

Nuxt Form tem como objetivo, facilitar a criação de formulários no nuxt(vue), simplificando e automatizando muitas
tarefas repetitivas.

## Conceitos chaves

O Nuxt form é composto por dois compoenentes principais:

    Formulário (Form) e Campos (Field)

## Caractéristicas

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

* Manter sempre documentação atializada com muitos exemplos e refêrencias.

## Instalação

Instale o pacote npm:

```bash
  npm install @agtm/nuxt-form
```

Adicione no arquivo nuxt.config.js:

```bash
modules: [
  '@agtm/nuxt-form/nuxt'
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
    fieldType: 'nv-text-field'
  }
]

```

* No exemplo acima descrevemos 3 campos name, name2 e name3, do tipo texto simples
* fieldName mapeia o nome do atributo definido no modelo (v-model) diretamente, então fieldName é importante para acesso
  aos dados
* Schema foi criado tendo em mende velocidade de desenvolvimento, portanto todos os campos serão renderizados um embaixo
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
          fieldType: 'nv-text-field'
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

Campos definidos via slot são renderizado acima dos campos definidos via schema, ou seja,  se você criar um novo campo 
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

## TODO: nuxt-model

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

Agora imagine que você precise criar um campo para editar apenas o atributo "nome" dentro do objeto "personal" e não "
personal"

Isso é feito facilmente definindo o nome do campo como "personal.name".

exemplo:

```vue
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




## TODO: Acessando Métodos e atributos do formulários através de Ref

## TODO: Validação

## TODO: Opções do Modulo

## TODO: Debugger

## TODO: Refêrencia de campos

## TODO: Criando um campo Customizado

* Todos os campos devem estender BaseField
* Tomar cuidado para não sobrescrever uma prop do BaseField, como  errors
* Adicionar componente <error-message :errors="fErrors"/> para imprimir mensaens de erro padrão

## TODO: i18n

# Rêferencias

## Opções do Módulo

| Atributo | Descrição                                                                                                                                                                                                                                                                 | Padrão  |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| debugger | Modo depuração, exibe borda vermelha nos componentes internos e exibe informações sobre componentes.                                                                                                                                                                      | true    |
| nuxtI18n | Habilita suporte ao plugin do nuxt: nuxt-i18n deve estar instalado no projeto, veja documentação em: https://pt.nuxtjs.org/docs/2.x/get-started/installation Necessário carregar arquivos de tradução do formulário em seu projeto localizado em @agtm/nuxt-form/src/lang | false   |
| language | Idioma utilizado caso não queira utilizar o modulo "nuxt-i18n". Caso precise da funcionalidade de idioma dinâmico necessário utilizar o "nuxt-i18n". Por enquanto apensar idioma pt-BR está disponível                                                                    | 'pt-BR' |

Table Editor: https://www.tablesgenerator.com/markdown_tables
