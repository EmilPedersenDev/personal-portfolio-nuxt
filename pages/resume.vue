<template>
  <div class="resume">
    <div :class="['resume-wrapper', isAnimating && '--is-animating']">
      <h1>Resume</h1>
      <a href="cv.pdf" download="cv.pdf">
        <e-button
          @click.native.stop
          btnText="Download"
          minWidth="150"
        ></e-button>
      </a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Resume",
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
};
</script>

<style lang="scss" scoped>
.resume {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  .resume-wrapper {
    transition: all $animation-duration ease $animation-delay;
    transform: translateY(25rem);
    opacity: 0;
    visibility: hidden;
    h1 {
      letter-spacing: 0.1875rem;
      font-weight: 200;
      font-size: 2.8125rem;
      text-align: center;
      margin-bottom: 1.875rem;
    }
    &.--is-animating {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
