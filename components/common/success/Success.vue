<template>
  <div :class="['success', isActive && 'animate']">
    <img src="../../../assets/icons/ok.svg" alt="check mark" />
    <h1>Message Sent!</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "e-success",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.success {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1.875rem 0 3.125rem;
  opacity: 0;
  visibility: hidden;
  transition: all $animation-short-duration ease;
  &.animate {
    opacity: 1;
    visibility: visible;
  }

  img {
    width: 5rem;
    height: auto;
  }

  h1 {
    margin-top: 1.25rem;
    letter-spacing: 0.125rem;
    font-weight: 200;
  }
}
</style>
