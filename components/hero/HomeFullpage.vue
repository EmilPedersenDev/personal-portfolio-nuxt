<template>
  <div :class="['hero', showLandingPage && 'mounted']">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <e-landing
        :goToPage="goToPage"
        :isLandingAnimating="isLandingAnimating"
      ></e-landing>
      <e-project-summary
        :isProjectAnimating="isProjectAnimating"
      ></e-project-summary>
      <e-about
        :isAboutAnimating="isAboutAnimating"
        :goToPage="goToPage"
      ></e-about>
    </full-page>
  </div>
</template>

<script>
import ProjectSummary from "../project-summary/ProjectSummary.vue";
import Landing from "../landing/Landing.vue";
import About from "../about/About.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    showLandingPage: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    "e-landing": Landing,
    "e-project-summary": ProjectSummary,
    "e-about": About,
  },
  data() {
    return {
      options: {
        licenseKey: process.env.VUE_APP_LICENSE_KEY,
        menu: "#menu",
        navigation: false,
        sectionsColor: ["#000", "#b9b9b9", "#121212"],
        controlArrows: true,
        scrollBar: false,
        scrollingSpeed: 1200,
        onLeave: this.onLeave,
        afterLoad: this.afterLoad,
        verticalCentered: false,
        afterRender: this.afterRender,
        scrollOverflow: false,
        scrollOverflowReset: false,
      },
      isLandingAnimating: false,
      isProjectAnimating: false,
      isAboutAnimating: false,
      asideNav: undefined,
    };
  },
  mounted() {
    this.setBlackNavbar(false);
  },
  watch: {
    showLandingPage(val) {
      if (val) {
        this.options.navigation = true;
        this.isLandingAnimating = true;
      }
    },
    isBlackNavbar(isBlack) {
      if (!this.asideNav) return;
      if (!isBlack) {
        this.asideNav.classList.add("white");
        return;
      }
      this.asideNav.classList.remove("white");
    },
  },
  computed: {
    ...mapGetters({
      isBlackNavbar: "navbar/IS_BLACK_NAVBAR",
    }),
  },
  methods: {
    ...mapMutations({
      setBlackNavbar: "navbar/SET_BLACK_NAVBAR",
      setFullpageLoaded: "navbar/SET_FULLPAGE_LOADED",
    }),
    onLeave(origin, destination, direction) {
      this.setBlackNavbar(false);
      this.isLandingAnimating = false;
      this.isProjectAnimating = false;
      this.isAboutAnimating = false;
      this.asideNav.style.visibility = "visible";

      if (destination.index === 0) {
        this.isLandingAnimating = true;
      } else if (destination.index === 1) {
        this.setBlackNavbar(true);
        this.isProjectAnimating = true;
      } else {
        this.isAboutAnimating = true;
        this.setBlackNavbar(false);
      }
    },
    afterRender(page) {
      this.asideNav = document.getElementById("fp-nav");
      if (!this.asideNav) return;
      this.asideNav.classList.add("white");
    },
    goToPage(id) {
      this.$refs.fullpage.api.moveTo(id);
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin background-style {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.hero {
  @include fullHeightAndWidth;
  position: relative;
  opacity: 0;
  visibility: hidden;
  transition: opacity 2.3s ease;
  &.mounted {
    opacity: 1;
    visibility: visible;
  }
  #fullpage {
    .section {
      position: relative;
    }
  }
}
</style>
