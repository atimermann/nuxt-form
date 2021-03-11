<template>
  <div>

    <div>--- BEGIN form teste Data ---</div>
    formData={{ formData }}<br/>
    standAlone={{ standalone }}
    <div>--- END form teste Data ---</div>

    <h2>Teste Stand Alone</h2>
    <h2>Teste FORM</h2>
    <v-card>
      <v-container>
        <nuxt-form :schema="schema" v-model="formData" ref="form" @submit="submit">
          <nv-text-field
              field-name="name"
              outlined
              hide-details
              dense
              label="Nome"
              :validators="['required', 'mustBeEmpty']"
          />
          <nv-text-field
              field-name="password"
              outlined
              hide-details
              dense
              label="Digite a senha"
              :validators="{validator: 'equal', options: {field: 'password2', otherLabel: 'Confirme a Senha'}}"
          />
          <nv-text-field
              field-name="password2"
              outlined
              hide-details
              dense
              label="Confirme a Senha"
          />
        </nuxt-form>

        <v-btn @click="$refs.form.submit()">SUBMIT</v-btn>
      </v-container>
    </v-card>


  </div>
</template>

<script>
export default {

  mounted() {

    // this.$refs.form.setValues({name: 'André'})

  },

  data() {
    return {
      standalone: 'stand_alone',
      formData: {},
      schema: [
        {
          fieldName: 'lastname',
          fieldType: 'nv-text-field',
          // Pode ser string ou function, se string usa validação interna
          validators: ['required', this.validation]
        }
      ]
    }
  },

  methods: {

    validation(value, model) {
      console.log('VALIDATION:', value)
      return {valid: false, error: 'VALIDATOR_DEFAULT'}
    },

    submit(valid, values, fields) {

      console.log(valid, values, fields)

      fields.name.setErrors('Tem erro aqui pow')

      setTimeout(() => {

        this.$refs.form.clearErrors()

      }, 4000)

      this.$refs.form.setErrors(['Erro Global'])



    }

  }
}
</script>
