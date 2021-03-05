# projeto

Núcleo
------

Documentar bem todo o funcionamento, fluxo e forma de uso com muitos exemplos, como criar um field

* Três modos:
    * Stand-alone (apenas o campo)
    * Schema (gera campos automaticamente baseado no objeto ou model)
    * manual (montagem dos campos manualmente via slot template)
    * misto (schema + manual, permite começar com schema e ir customizando caso necessário)

* Documentar metodo de busca de componentes aprendido no form atual (consegue varrer o template atrás de componentes compativel e altera-los, complexo, mas interessante)
    * mapClildren
    * Será o modo 1, onde o usuário cria os campos e o form varre atrás dele (MODO CUSTOMIZAD) - Form customizado, qualquer layout desejado (DEMORA MAIS PRA CRIAR)
    * No modo 2, o form cria os childrens via slots baseado, no schema/ model (MODO AUTOMATICO) - Form simples, linear  (CRIAÇÃO RÁPIDA)
* Contexto deve carregar automaticamente através de um plugin
* Vai ser um módulo do nuxt
* Integração com nuxt-model (vc passa o vmodel e monta o form, nuxt-modelo se comporta como um objeto) - deve funcionar com objeto simples também

* Não existirá mais objeto formHandler
* validações:
    * Cada campo poderá implementar suas validações validação interno do campo
    * Validação padrão
    * Validação customizado externamente pelo usuario
    * Copiar do vuelidade o conceito de sujo limpo, etc...
* Revisar Object Tree (ver lodash)
* Formulário não trata requisição(Removido função HandleRequest, erros de backend devem ser adicionado manualmente (similar ao setValue))
* Erros:
    * Erros podem ser setado automaticamente pelo validador interno
    * Passados externamente (podendo ser vindo do backend, deve setar externamente)

* Remover MapperObject
* Filtros

Outros Requisitos
-----------------

* Função habilitar/ desabilitar
* NO model vamos ter <fieldName>Attrs
* Separar FormHandler em um módulo próprio -> NPM
* Separar Model em um módulo próprio -> NPM
* Implementar validação, remover biblioteca atual, utilizar:
* Migrar validação biblioteca: https://github.com/validatorjs/validator.js - Connect to preview
* Revisar impressão de erros

* Corrigir hide-details, mb-3

* Dar foco ao primeiro campo com erro após validação
* Criar nova funcionalidade de impressão de erro abaixo dos campos que permita Multilinhas / Label
* Definir erros globais
* Configurar arquivos GQL separadamente
* Separar forms das "Pages" e por em um componente em "Apps"
* Tratar todos os Any
* Configurar todas as validações do vuelidate com tradução
* Mudar estrutura para centalizar GQLs (mutation e query) separado da app para poder ser aproveitada por outros apps
* Fluxo de bloqueio do form quando aguardando,
* Loading
* Envio do token automaticamente na requisição
* Suporte blur, ao perder foco validar novamentem ou quando digitar, deixar opcional
* Campos complexos podem implementar validações complexas internamente
* Validação pode ser definida dinamicamente
* criar função focuso, para forcar de fora do formulário, passando nome
* mask
* Limpar campo / Limpar formulário

Discussão:

* Suporte a Vuejs ou apenas Nuxt
* Criar plugins

* Criar um modulo que englobe form e model????
    * dataHandler
    * dataManager

* Typescript (apenas comentários)
* nunca vai ser possivel mapear objeto ⇔ form diretamente, criar um mapper (Atual tá complicado), mas deixar separado



* Criar uma diretiva (em vez de v-form, ter o próprio)
* Permitir que o vModel sejá o próprio Model (por referencia), se o formulário não manipular um atributo, apenas ignora, mas guardar o valor ( Deu conflito com validador, alterar este comportamento quando a validação for refeita)

* Opção de montar o form automaticamente passando um schema ou um objeto nuxt-model (configurado) ou montar os campos automaticamente

