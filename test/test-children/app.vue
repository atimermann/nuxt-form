<template>
  <div ref="refChild">

    Meu Teste aqui

    <div>Sub Item</div>

    <component-child/>
    <br>
    <component-child
        fieldName="Meu novo campo"
    />


  </div>
</template>

<script>

// this.$ Representa o componente atual (é do tipo COMPONENTE)
// this.$ tem um subTree que tem um children (subTree.children) que é um array
// Esse array representa todos os sub itens neste componente, como elementos html e componentes
// cada item desse array é um VNODE
// Se o Vnode for um componente, ele tem o atributo component que é do tipo (é do tipo COMPONENTE)
// e apartir desse COMPONENTE podemos acessar o subtree.childrem e faze ra busca novamente
// Proxy é a instancia do componente como se tivesse usando ref


// REF: https://stackoverflow.com/a/71146789


import ComponentChild from './component-child.vue'

export default {

  components: {
    ComponentChild
  },


  mounted() {

    console.log('options', this.$options)

    // console.log('$', this.$)
    // console.log('$root', this.$root.$)
    // console.log('$parent', this.$parent.$)

    console.log('My TARGET', this.$.subTree.children[4].component)

    const myChild = this.$.subTree.children[4].component.proxy

    console.log(myChild.isNuxtFormFieldInstance)
    console.log(myChild.props.fieldName)

    console.log('ON', myChild.$watch)

    // TODO: Ver como criar evento no filho com https://docs.gitlab.com/ee/development/fe_guide/vue3_migration.html#event-hub
    // TALVEZ USAR WATCH MESMO

  },


}


//
//
//const refChild = ref(null)
//
//console.log('this', this)
//
//onMounted(() => {
//
//  console.log('this', this)
//
//  console.log('ComponentChild', ComponentChild)
//  console.log('refChild', refChild)
//
//
//
//})


</script>
