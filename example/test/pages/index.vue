<template>
  <div>
    <v-btn @click="change">Change</v-btn>

    <div>--- BEGIN form teste Data ---</div>
    formData={{ formData }}<br/>
    standAlone={{ standalone }}
    <div>--- END form teste Data ---</div>

    <h2>Teste Stand Alone</h2>
    <nv-text-field
        v-model="standalone"
    />
    <h2>Teste FORM</h2>
    <nuxt-form :schema="schema" v-model="formData">
      <template #Name3>
        <nv-text-field
            field-name="Name3"
        />
      </template>

      <nv-text-field
          field-name="Name2"
      />

      <p>
        <nv-text-field
            field-name="SubExterno"
        />
      </p>

      <nv-text-field
          field-name="externo3"
      />


    </nuxt-form>




  </div>
</template>

<script>

import Logo from "../components/Logo";

export default {
  components: {Logo},


  data() {
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
        },
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


  created() {
    console.log('CREATED')

  },

  mounted() {
    console.log('MOUNTED')


  },

  methods: {

    change() {

      this.formData = {
        personal: {
          name: Math.random().toString()
        }
      }

    }


  }


}
</script>
