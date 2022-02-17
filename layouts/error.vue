<template>
  <div class="e-container not-found">
    <div :class="['not-found__wrapper', isAnimating && '--is-animating']">
      <h1>Ooooops. page not found 🙈</h1>
      <e-distortion text="404" :isDistortionAnimating="isAnimating" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Distortion from "../components/distortion/Distortion.vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  props: ["error"],
  layout: "error",
  components: {
    "e-distortion": Distortion,
  },
  data() {
    return {
      isAnimating: false,
    };
  },
  mounted() {
    this.setBlackNavbar(false);

    setTimeout(() => {
      this.isAnimating = true;
    }, 1);
  },
  methods: {
    ...mapMutations({
      setBlackNavbar: "navbar/SET_BLACK_NAVBAR",
    }),
  },
});
</script>

<style lang="scss" scoped>
$_not-found-max-width: 43.75;
$_not-found-404-font-size: 2;

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .not-found__wrapper {
    transition: all $animation-duration ease $animation-delay;
    transform: translateY(25rem);
    opacity: 0;
    visibility: hidden;
    width: 100%;
    max-width: $_not-found-max-width + rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;

    &.--is-animating {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    h1,
    h2 {
      display: inline-block;
    }

    h2 {
      font-size: $_not-found-404-font-size + rem;
    }
  }
}
</style>
