<template>
  <div id="app">
    <e-navigation />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Navigation from "../components/navigation/Navigation.vue";
import Vue from "vue";

export default Vue.extend({
  components: {
    "e-navigation": Navigation,
  },
});
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}

#fp-nav {
  span {
    background: $black;
  }
  &.white {
    span {
      background: $white;
    }
  }
}
</style>
