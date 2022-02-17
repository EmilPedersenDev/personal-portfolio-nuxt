<template>
  <div class="wrapper">
    <h1
      :class="['glitch', isDistortionAnimating && 'animate']"
      :data-text="text"
    >
      {{ text }}
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "e-distortion",
  props: {
    text: {
      type: String,
      default: "",
    },
    isDistortionAnimating: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .glitch {
    color: white;
    font-family: sans-serif;
    font-weight: 800;
    position: relative;
    font-size: 5rem;
    @include rw-respond-above(m) {
      font-size: 6.25rem;
    }
    padding: 0;
    transition: transform $animation-duration ease $animation-third-item-delay,
      opacity $animation-duration ease-in $animation-third-item-delay,
      visibility $animation-short-duration ease-in $animation-third-item-delay;
    transform: translateY(25rem);
    opacity: 0;
    visibility: hidden;
    &.animate {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }

  .glitch::before,
  .glitch::after {
    padding: 0;
    color: $white;
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    background: $main-background;
    overflow: hidden;
    top: 0;
  }

  .glitch::before {
    left: 0.1875rem;
    text-shadow: -0.125rem 0 $red;
    animation-name: glitch-animation-1;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: reverse-alternate;
  }

  .glitch::after {
    left: -0.1875rem;
    text-shadow: -0.125rem 0 $purple;
    animation-name: glitch-animation-2;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: reverse-alternate;
  }
}

@keyframes glitch-animation-1 {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(math.div(1, $steps)))} {
      clip: rect(random(150) + px, 350px, random(150) + px, 0);
    }
  }
}

@keyframes glitch-animation-2 {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(math.div(1, $steps)))} {
      clip: rect(random(150) + px, 350px, random(150) + px, 0);
    }
  }
}
</style>
