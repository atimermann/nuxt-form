<template>
  <div>
    <div v-for="(error, index) in errors" :key="index" class="pl-3 error--text">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
/**
 * Componente base para utilizado por outros fields para impressão padrão de erros
 */
export default {

  props: {
    errors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      internalErrors: this.errors
    }
  },
  watch: {
    errors(errors) {
      this.internalErrors = errors
    }
  }
}
</script>
