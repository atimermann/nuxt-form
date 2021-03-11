# projeto

Núcleo
------

Documentar bem todo o funcionamento, fluxo e forma de uso com muitos exemplos, como criar um field

* Três modos:
    *[OK] Stand-alone (apenas o campo)
    *[OK] Schema (gera campos automaticamente baseado no objeto ou model)
    *[OK] manual (montagem dos campos manualmente via slot template)
    *[OK] misto (schema + manual, permite começar com schema e ir customizando caso necessário)

*[OK] Documentar metodo de busca de componentes aprendido no form atual (consegue varrer o template atrás de componentes compativel e altera-los, complexo, mas interessante)
    *[OK] mapClildren
    *[OK] Será o modo 1, onde o usuário cria os campos e o form varre atrás dele (MODO CUSTOMIZAD) - Form customizado, qualquer layout desejado (DEMORA MAIS PRA CRIAR)
    *[OK] No modo 2, o form cria os childrens via slots baseado, no schema/ model (MODO AUTOMATICO) - Form simples, linear  (CRIAÇÃO RÁPIDA)
* Contexto deve carregar automaticamente através de um plugin
*[OK] Vai ser um módulo do nuxt
* Integração com nuxt-model (vc passa o vmodel e monta o form, nuxt-modelo se comporta como um objeto) - deve funcionar com objeto simples também

*[OK] Não existirá mais objeto formHandler
* validações:
    * Assincrona
    * Cada campo poderá implementar suas validações validação interno do campo
    * Validação padrão
    * Validação customizado externamente pelo usuario
    * Copiar do vuelidade o conceito de sujo limpo, etc...
    * validação deve funcionar no modo standalone
    * Tradução de mensagem de validação
    * Migrar validação biblioteca: https://github.com/validatorjs/validator.js - Connect to preview
    * ---------------------------------------------------------------------------------
    * Validações podem ser implementadas pelo próprio campo (VAlidações complexas especificas)  
    * Validação padrão built-in incluída no field
    * Validação customizada via funcion por field
    * validação executada pelo form (valida mais de um campo ex: confirmação de senha) build in?
        * Velidação global customizada
    * Tradução de mensagem de erro
    * Suporte blur, ao perder foco validar novamentem ou quando digitar, deixar opcional

* $dirty
* $error
* $pending
* $invalid




* Sistema de Erros:
    * Por campo e por form
   

    * modos de validação impressão de erro
        * Apenas ao submeter, porém limpa validação assim que o campo é alterado
    
    * Form pede pro campo se validar
    * Validação separada da mensagem de erro, Validação ao vivo
    * Valida em todo change, field tem um status $valid
    * Dois sistemas, impressão de erro e validação

        
*[OK] Revisar Object Tree (ver lodash)
*[OK] Formulário não trata requisição(Removido função HandleRequest, erros de backend devem ser adicionado manualmente (similar ao setValue))
* Erros:
    * Erros podem ser setado automaticamente pelo validador interno
    * Passados externamente (podendo ser vindo do backend, deve setar externamente)

*[OK] Remover MapperObject
* Filtros
* Options
* Logger, que pode ser desativado no modo produção
* Modu debug (configurado via modulo)
* Criar slots para customizar layout do formulário (no modo schema)
* Criar slots pra customizar outras areas do formulário como actions (botões de ação)

Outros Requisitos
-----------------

* Função habilitar/ desabilitar
* NO model vamos ter <fieldName>Attrs
* [OK] Separar FormHandler em um módulo próprio -> NPM
* [OK] Separar Model em um módulo próprio -> NPM
* Implementar validação, remover biblioteca atual, utilizar:
* Revisar impressão de erros

* Corrigir hide-details, mb-3

* Dar foco ao primeiro campo com erro após validação
* Criar nova funcionalidade de impressão de erro abaixo dos campos que permita Multilinhas / Label
* Configurar arquivos GQL separadamente
* Tradução de erro
* Fluxo de bloqueio do form quando aguardando,
* Loading

* Campos complexos podem implementar validações complexas internamente
* Validação pode ser definida dinamicamente
* criar função focus, para forcar de fora do formulário, passando nome
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

== Anotações

*
