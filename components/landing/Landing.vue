<template>
  <div class="section" id="landing" data-anchor="section1">
    <div class="twinkling-stars"></div>
    <div :class="['section-info', isLandingAnimating && 'animate']">
      <h2>Hello There!</h2>
      <h2>I'm</h2>
      <e-distortion
        text="EMIL"
        :isDistortionAnimating="isLandingAnimating"
      ></e-distortion>
      <h2>[Web Developer]</h2>
    </div>
    <div class="section-link" @click="goToPage(2)">
      <img src="../../assets/icons/arrow-down.svg" alt="arrow down" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Distortion from "../distortion/Distortion.vue";

export default Vue.extend({
  name: "e-landing",
  components: {
    "e-distortion": Distortion,
  },
  props: {
    goToPage: {
      type: Function,
    },
    isLandingAnimating: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
#landing {
  background: $main-background
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat;
  .section-info {
    position: absolute;
    top: 40%;
    left: 20%;
    transform: translate(-20%, -40%);

    p {
      padding-bottom: 1.25rem;
    }

    h2 {
      letter-spacing: 0.1875rem;
      font-weight: 200;
      &:first-child {
        font-size: 1.875rem;
        margin-bottom: 0.625rem;
        transition: transform $animation-duration ease $animation-delay,
          opacity $animation-duration ease-in $animation-delay,
          visibility $animation-short-duration ease-in $animation-delay;
        transform: translate(0, 25rem);
        padding: 0 0.3125rem;
        @include rw-respond-above(m) {
          transform: translate(-1.875rem, 25rem);
          padding: 0;
        }
        opacity: 0;
        visibility: hidden;
      }
      &:nth-child(2) {
        padding: 0 0.3125rem 0.625rem;
        @include rw-respond-above(m) {
          padding: 0 0.3125rem;
        }
        transition: transform $animation-duration ease
            $animation-second-item-delay,
          opacity $animation-duration ease-in $animation-second-item-delay,
          visibility $animation-short-duration ease-in
            $animation-second-item-delay;
        transform: translateY(25rem);
        opacity: 0;
        visibility: hidden;
      }
      &:last-child {
        padding: 0.625rem 0.3125rem;
        @include rw-respond-above(m) {
          padding: 0.625rem 0;
        }
        transition: transform $animation-duration ease
            $animation-fourth-item-delay,
          opacity $animation-duration ease-in $animation-fourth-item-delay,
          visibility $animation-short-duration ease-in
            $animation-fourth-item-delay;
        text-align: right;
        transform: translateY(25rem);
        opacity: 0;
        visibility: hidden;
      }
    }

    &.animate {
      h2 {
        &:first-child {
          @include rw-respond-above(m) {
            transform: translate(-1.875rem, 0);
          }
          transform: translate(0);
          opacity: 1;
          visibility: visible;
        }
        &:nth-child(2) {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }
        &:last-child {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }

  .section-link {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3.125rem;
    height: 3.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      height: 1.875rem;
      width: 1.875rem;
      animation: bounceUpDown 2s infinite;
    }
  }

  .section-about-me {
    position: absolute;
    left: 80%;
    top: 20%;
    transform: translate(-80%, -20%);
  }

  .twinkling-stars {
    width: 625rem;
    height: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    background: transparent
      url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png")
      repeat;
    background-size: 62.5rem 62.5rem;
    animation: stars 50s linear infinite;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0.625rem;
    background: $gray-main-background;
    background-image: linear-gradient(
      to bottom,
      rgba(185, 185, 185, 0) 0% rgba(185, 185, 185, 1) 100%
    );
    box-shadow: 0 0 0.9375rem 0.625rem $gray-main-background,
      0 0 0.9375rem 0.625rem $gray-main-background;
  }
}

@keyframes stars {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(62.5rem, 0, 0);
  }
}

@keyframes bounceUpDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(0.625rem);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
