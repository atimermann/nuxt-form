<template>
  <div>
    <!--    Campos criados manualmente -->
    <slot></slot>
    <div v-for="(field, index) in schema" :key="index">

      <!--  Campos criados manualmente mas de  posição customizada (opcional, só implementar se for simples)   -->
      <slot :name="field.fieldName"></slot>

      <!--   Campos criados automaticamente  -->
      <component :is="field.fieldType"></component>


    </div>
  </div>
</template>

<script>
export default {
  name: "nuxt-form",

  props: ['schema'],

  data() {

    return {
      slotsInfo: []
    }

  },

  created() {
    console.log(this)
    // Aqui carregamos informação dos slotes para não carregar no schema
    this.slotsInfo = this.$slots.default.length

  },

  mounted() {
    console.log(this)
  }
}
</script>

<style scoped>

</style>
