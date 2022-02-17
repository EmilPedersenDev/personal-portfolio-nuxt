<template>
  <div class="section" id="about">
    <div class="about-wrapper">
      <div :class="['about__header', isAboutAnimating && 'animate']">
        <span></span>
        <h1>Who am I</h1>
      </div>
      <div class="about__text">
        <img
          class="about__gengar"
          src="../../assets/images/gengar.svg"
          alt="gengar"
        />
        <img src="../../assets/images/profil.jpg" alt="profil" />
        <p :class="{ animate: isAboutAnimating }">
          "I am a developer who thrives on challenging myself and to become
          better than I was yesterday".
        </p>
        <p :class="{ animate: isAboutAnimating }">
          "When I'm not coding, It's probably fishing, Pokemon card hunting or
          being out in the wild that takes up my time".
        </p>
        <img
          class="about__fish"
          src="../../assets/images/fish.png"
          alt="fish"
        />
      </div>

      <div class="about__back-to-top" @click="goToPage(1)">
        <img src="../../assets/icons/arrow-down.svg" alt="back to top" />
        <p>Back to top</p>
      </div>

      <div class="about__mountain"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "e-about",
  props: {
    isAboutAnimating: {
      type: Boolean,
      default: false,
    },
    goToPage: {
      type: Function,
    },
  },
});
</script>

<style lang="scss" scoped>
#about {
  .about-wrapper {
    height: 80%;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    .about__header {
      display: flex;
      align-items: center;
      &.animate {
        span {
          transform: translateX(0);
        }
        h1 {
          transform: translateX(0);
        }
      }

      span {
        width: 3.125rem;
        background: #fff;
        height: 0.0625rem;
        transition: transform $animation-duration ease
          $animation-second-item-delay;
        transform: translateX(-31.25rem);
        margin-right: 0.625rem;
      }
      h1 {
        font-size: 2rem;
        position: relative;
        line-height: 1.5;
        letter-spacing: 0.1875rem;
        font-weight: 200;
        transition: transform $animation-duration ease $animation-delay;
        transform: translateX(-18.75rem);
      }
    }

    .about__text {
      position: absolute;
      @include rw-respond-above(m) {
        top: 40%;
        left: 60%;
        transform: translate(-60%, -40%);
      }
      top: 40%;
      left: 50%;
      transform: translate(-50%, -40%);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 80%;
      max-width: 18.75rem;
      text-align: center;
      p {
        margin-top: 1.875rem;
        line-height: 1.5;
        letter-spacing: 0.125rem;
        font-size: clamp(0.75rem, 1vw, 1rem);
        &:first-of-type {
          transition: transform $animation-duration ease $animation-delay,
            opacity $animation-duration ease-in $animation-delay,
            visibility $animation-short-duration ease-in $animation-delay;
          transform: translateY(18.75rem);
          opacity: 0;
          visibility: hidden;
        }
        &:last-of-type {
          display: block;
          transition: transform $animation-duration ease
              $animation-second-item-delay,
            opacity $animation-duration ease-in $animation-second-item-delay,
            visibility $animation-short-duration ease-in
              $animation-second-item-delay;
          transform: translateY(18.75rem);
          opacity: 0;
          visibility: hidden;
          @include rw-respond-below(m) {
            margin-top: 0.625rem;
          }
        }
        &.animate {
          transform: translateX(0);
          opacity: 1;
          visibility: visible;
        }
      }

      img {
        width: 6.25rem;
        height: 6.25rem;
        border-radius: 50%;
      }
      .about__gengar {
        position: absolute;
        bottom: 50%;
        right: 50%;
        width: 12.5rem;
        height: 12.5rem;
        transform: translate(50%, 50%);
        opacity: 0.03;
        @include rw-respond-above(m) {
          bottom: -80%;
          right: -100%;
          transform: translate(-100%, -80%);
        }
      }
      .about__fish {
        position: absolute;
        top: -20%;
        left: -30%;
        width: 18.75rem;
        height: 18.75rem;
        transform: translate(-30%, -20%);
        opacity: 0.05;
        display: none;
        @include rw-respond-above(m) {
          display: inline;
        }
      }
    }

    .about__mountain {
      width: 31.25rem;
      height: 12.5rem;
      position: absolute;
      bottom: 0;
      background-image: url("../../assets/images/mountain.png");
      background-position: -2.5rem 3.25rem;
      background-size: cover;
      background-repeat: no-repeat;
      opacity: 0.5;
      @include rw-respond-above(m) {
        opacity: 1;
      }
    }

    .about__back-to-top {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      position: absolute;
      cursor: pointer;
      @include rw-respond-below(m) {
        left: 50%;
        bottom: 5%;
        right: auto;
        transform: translateX(-50%);
        background: $main-background;
        opacity: 0.9;
        border-radius: 0.3125rem;
        padding: 0.625rem;
        z-index: 100;
        img {
          display: none;
        }
        p {
          margin: 0 !important;
          text-decoration: underline;
        }
      }
      right: 5%;
      bottom: 5%;
      img {
        height: 1.25rem;
        width: 1.25rem;
        flex-basis: 100%;
        transform: rotate(180deg);
        animation: bounceUpDown 2s infinite;
      }
      p {
        margin-top: 0.75rem;
        font-size: 0.75rem;
        letter-spacing: 0.125rem;
      }
    }
  }
}
@keyframes bounceUpDown {
  0% {
    transform: translateY(0) rotate(180deg);
  }
  50% {
    transform: translateY(0.625rem) rotate(180deg);
  }

  100% {
    transform: translateY(0) rotate(180deg);
  }
}
</style>
