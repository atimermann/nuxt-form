# projeto

## TODO:

* Criar um metodo ou arquivo (Mixin) separado para tratar a geração automatica de campo à partir do modelo (marcado no código)
* Criar uma função para gerar campo sautomaticamente apartir do tipo de dados do Model
* Criar Método Debug para log, substituir console.log e logar tudo q é processado se o modo DEBUG for ativado (nuxt isDev???)
* Criar testes unitários

Núcleo
------

* Integração com nuxt-model (vc passa o vmodel e monta o form, nuxt-modelo se comporta como um objeto) - deve funcionar com objeto simples também
* NO model vamos ter <fieldName>Attrs ( USAR fieldType mesmo)
* Permitir que o vModel sejá o próprio Model (por referencia), se o formulário não manipular um atributo, apenas ignora, mas guardar o valor ( Deu conflito com validador, alterar este comportamento quando a validação for refeita)
* mask
* Fluxo de bloqueio do form quando aguardando / Loading  
* Função habilitar/ desabilitar
* Dar foco ao primeiro campo com erro após validação  
* Botões de submit padronizado
* Limpar campo / Limpar formulário
* Criar Mapper através de função definida no field e de altera valores na troca de informação entre field e form  
* criar função focus, para forcar de fora do formulário, passando nome
* Filtros
* Criar slots pra customizar outras areas do formulário como actions (botões de ação)
* Modu debug (configurado via modulo)
* Logger, que pode ser desativado no modo produção (bom pra detectar código repetido)



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
*[OK] Contexto deve carregar automaticamente através de um plugin, pode ser acesso diretamente pois o nuxt-form é um componente
*[OK] Vai ser um módulo do nuxt


*[OK] Não existirá mais objeto formHandler
* validações:
    * [OK] Assincrona
    * [OK] Cada campo poderá implementar suas validações validação interno do campo
    * [OK] Validação padrão
    * [OK] Validação customizado externamente pelo usuario
    * [OK] Copiar do vuelidade o conceito de sujo limpo, etc...
    * [OK] validação deve funcionar no modo standalone
    * [OK] Tradução de mensagem de validação
    * [OK] Migrar validação biblioteca: https://github.com/validatorjs/validator.js - Connect to preview
    * ---------------------------------------------------------------------------------
    * [OK] Validações podem ser implementadas pelo próprio campo (VAlidações complexas especificas)  
    * [OK] Validação padrão built-in incluída no field
    * [OK] Validação customizada via funcion por field
    * [OK]validação executada pelo form (valida mais de um campo ex: confirmação de senha) build in?
        * [OK] Velidação global customizada
    * [OK]Tradução de mensagem de erro
    * [OK] Suporte blur, ao perder foco validar novamentem ou quando digitar, deixar opcional

* [OK] $dirty
* [OK] $error
* [XX] $pending
* [OK] $invalid




* [OK] Sistema de Erros:
    * [OK] Por campo e por form   
    * modos de validação impressão de erro
        * Apenas ao submeter, porém limpa validação assim que o campo é alterado    
    * Form pede pro campo se validar
    * Validação separada da mensagem de erro, Validação ao vivo
    * Valida em todo change, field tem um status $valid
    * Dois sistemas, impressão de erro e validação

        
*[OK] Revisar Object Tree (ver lodash)
*[OK] Formulário não trata requisição(Removido função HandleRequest, erros de backend devem ser adicionado manualmente (similar ao setValue))
* Erros:
    * [OK] Erros podem ser setado automaticamente pelo validador interno
    * [OK] Passados externamente (podendo ser vindo do backend, deve setar externamente)

*[OK] Remover MapperObject


Outros Requisitos
-----------------


* [OK] Separar FormHandler em um módulo próprio -> NPM
* [OK] Separar Model em um módulo próprio -> NPM
* [OK] Implementar validação, remover biblioteca atual, utilizar:
* [OK] Revisar impressão de erros

* [OK] Corrigir hide-details, mb-3


* [OK] Criar nova funcionalidade de impressão de erro abaixo dos campos que permita Multilinhas / Label
* [OK] Configurar arquivos GQL separadamente
* [OK] Tradução de erro


* [OK] Campos complexos podem implementar validações complexas internamente
* [OK] Validação pode ser definida dinamicamente


Discussão:

* Suporte a Vuejs ou apenas Nuxt
* [OK] Criar plugins

* [XX] Criar um modulo que englobe form e model????
    * [XX] dataHandler
    * [XX] dataManager

* Typescript (apenas comentários)
* nunca vai ser possivel mapear objeto ⇔ form diretamente, criar um mapper (Atual tá complicado), mas deixar separado



* [XK] Criar uma diretiva (em vez de v-form, ter o próprio)


* [OK] Opção de montar o form automaticamente passando um schema ou um objeto nuxt-model (configurado) ou montar os campos automaticamente
