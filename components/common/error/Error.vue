<template>
  <div class="e-error">
    <p>{{ error.message }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "e-error",
  props: {
    error: {
      type: Object,
    },
  },
});
</script>

<style lang="scss" scoped>
.e-error {
  p {
    font-size: 0.75rem;
    color: $error-bright;
    margin-bottom: 0.625rem;
    text-align: center;
  }
}
</style>
