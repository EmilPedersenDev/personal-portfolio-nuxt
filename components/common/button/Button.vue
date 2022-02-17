<template>
  <button
    class="e-button"
    @click="btnClick"
    :style="`min-width: ${minWidth}px`"
    :type="type"
    :disabled="disabled"
  >
    <img v-if="hasIcon" src="../../../assets/icons/download.svg" alt="" />
    <span> {{ btnText }} </span>
    <e-spinner type="simple" v-if="isLoading" />
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "e-button",
  props: {
    btnText: {
      type: String,
      default: "Click",
    },
    minWidth: {
      type: String,
      default: "100",
    },
    hasIcon: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    btnClick(e: Event): void {
      this.$emit("click", e);
    },
  },
});
</script>

<style lang="scss" scoped>
.e-button {
  background-color: #7232f2;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3125rem;
  padding: 0.625rem 0.625rem;
  margin: 0.625rem auto;
  transform: scale(1);
  transition: all ease 0.3s;
  box-shadow: none;
  img {
    height: 1.5625rem;
    width: 1.5625rem;
  }
  span {
    letter-spacing: 0.0625rem;
    font-weight: 400;
  }

  &:hover:not(:disabled) {
    cursor: pointer;
    box-shadow: 0 0 0.9375rem 0.3125rem rgba(114, 50, 242, 0.4),
      0 0 0.9375rem 0.1875rem rgba(114, 50, 242, 0.4);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
  }
}
</style>
