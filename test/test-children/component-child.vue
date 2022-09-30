<script setup>
import {ref} from 'vue'

const count = ref(0)

const isNuxtFormFieldInstance = true
const b = ref(2)


const props = defineProps(['field-name'])

defineExpose({
  isNuxtFormFieldInstance,
  b
})

</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
  <div>

    <div>A</div>

  </div>
</template>
