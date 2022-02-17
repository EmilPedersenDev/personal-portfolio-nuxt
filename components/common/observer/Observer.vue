<template>
  <div class="observer"></div>
</template>

<script lang="ts">
import Vue from "vue";

interface State {
  observer: IntersectionObserver;
}

export default Vue.extend({
  name: "e-observer",
  props: {
    isDisconnected: {
      type: Boolean,
      default: false,
    },
  },
  data: (): State => {
    return {
      observer: <IntersectionObserver>{},
    };
  },
  watch: {
    isDisconnected(val) {
      if (!val) return;
      this.disconnect();
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.$emit("intersecting");
      }
    });

    this.observer.observe(this.$el);
  },
  methods: {
    disconnect() {
      this.observer.disconnect();
    },
  },
});
</script>

<style lang="scss" scoped>
.observer {
  height: 6.25rem;
  width: 100%;
}
</style>
