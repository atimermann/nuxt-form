<template>
  <div>
    {{ aluno.toString() }}
    <hr>
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
    this.aluno = AlunoModel.create({name: 'André'})
    this.check()
  },

  methods: {

    check() {

      this.aluno.name = 'Fernando'

      console.log('CHECK ALUNO', this.aluno)
      console.log('JSON', this.aluno.toJSON())
    }

  }


}
</script>
