<template>
  <div class="pb-3">
    fModel={{ fModel }}
    <v-text-field
        v-model="fModel"
    />
  </div>
</template>


<script>

import BaseField from '../base-field'

export default {
  name: 'nv-text-field',
  extends: BaseField
}
</script>

<style scoped>

</style>
