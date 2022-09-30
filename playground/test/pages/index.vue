<template>
  <div>
    <v-btn @click="change">
      Change
    </v-btn>

    <div>--- BEGIN form teste Data ---</div>
    formData={{ formData }}<br>
    standAlone={{ standalone }}
    <div>--- END form teste Data ---</div>

    <h2>Teste Stand Alone</h2>
    <nv-text-field
      v-model="standalone"
    />
    <h2>Teste FORM</h2>
    <nuxt-form ref="form" v-model="formData" :schema="schema" @submit="onSubmit">
      <template #Name3>
        <nv-text-field
          field-name="Name3"
        />
      </template>

      <h3>Name2</h3>
      <nv-text-field
        field-name="Name2"
      />

      <v-card class="pa-3 mb-3" color="teal lighten-4">
        <h3>Sub Externo</h3>
        <nv-text-field
          field-name="SubExterno"
        />
      </v-card>

      <v-card class="pa-3 mb-3" color="red lighten-4">
        <h3>Externo3</h3>
        <nv-text-field
          field-name="externo3"
        />
      </v-card>

      <v-card class="pa-3" color="green lighten-4">
        <h3>DateTimePicker</h3>
        <nv-datetime-picker-field
          field-name="dateTime"
          label="Data e Hora"
          :validators="['required']"
        />
        VALUE= {{ formData.dateTime }}
      </v-card>

      <v-card class="pa-3 mt-3" color="blue lighten-4">
        <h3>Currency</h3>
        <nv-currency-field
          field-name="currency"
        />
        <p>VALUE= {{ formData.currency }}</p>
        <p>TYPE {{ typeof formData.currency }}</p>
      </v-card>

      <v-btn class="mt-3" @click="$refs.form.submit()">
        SUBMIT
      </v-btn>
    </nuxt-form>
  </div>
</template>

<script>

import Logo from '../components/Logo'

export default {
  components: { Logo },

  data () {
    console.log('DATA')

    return {
      standalone: 'stand_alone',
      formData: {
        personal: {
          name: 'André'
        },
        externo: [1, 2, 3, 4]
      },
      schema: [
        {
          fieldName: 'personal.name',
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
        // {
        //   fieldName: 'Name4',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name5',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name6',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name7',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name8',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name9',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name10',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name11',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name12',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name13',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name14',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name15',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name16',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name17',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name18',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name19',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name20',
        //   fieldType: 'nv-text-field'
        // },
        // {
        //   fieldName: 'Name21',
        //   fieldType: 'nv-text-field'
        // },

      ]
    }
  },

  created () {
    console.log('CREATED')
  },

  mounted () {
    console.log('MOUNTED')
  },

  methods: {

    onSubmit (isValid, model) {
      console.log('VALUES=', this.$refs.form.getValues())
    },

    change () {
      this.formData = {
        personal: {
          name: Math.random().toString()
        }
      }
    }

  }

}
</script>
