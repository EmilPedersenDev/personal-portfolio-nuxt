<template>
  <div class="home">
    <e-spinner v-if="isLoading && fullPageRefresh"></e-spinner>
    <e-slider
      ref="slider"
      v-show="!isLoading && fullPageRefresh"
      :isActive="isSliding"
      v-on:loaded="showLandingPage = true"
    ></e-slider>
    <div class="container">
      <e-home-fullpage
        :showLandingPage="showLandingPage"
        ref="homeFullpage"
      ></e-home-fullpage>
    </div>
  </div>
</template>

<script>
import HomeFullpage from "../components/hero/HomeFullpage.vue";
export default {
  components: {
    "e-home-fullpage": HomeFullpage,
  },
  beforeRouteUpdate(to, from, next) {
    if (Object.keys(to.query).length !== 0) {
      let query = { ...to.query };
      this.removeRouteQuery(query);
    } else {
      next();
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path !== "/") {
      if (Object.keys(to.query).length === 0) {
        next((vm) => vm.setIsFullpageRefresh(false));
        return;
      }

      let query = { ...to.query };

      next((vm) => vm.removeRouteQuery(query, vm.onEnterHomeRoute));
    } else {
      next((vm) => vm.setIsFullpageRefresh(true));
    }
  },
  data() {
    return {
      isLoading: true,
      isSliding: false,
      showLandingPage: false,
      fullPageRefresh: false,
      dynamicRoutes: [
        { page: "home", id: 1 },
        { page: "about", id: 3 },
        { page: "contact", id: 4 },
      ],
    };
  },
  mounted() {
    if (!this.fullPageRefresh) {
      this.isLoading = false;
      this.showLandingPage = true;
      return;
    }
    setTimeout(() => {
      this.isLoading = false;
      this.activateSlider();
    }, 1000);
  },
  methods: {
    activateSlider() {
      setTimeout(() => {
        this.isSliding = true;
      }, 200);
    },
    setIsFullpageRefresh(bool) {
      this.fullPageRefresh = bool;
    },
    removeRouteQuery(query, cb) {
      const { page } = query;

      if (!page) return;

      delete query.page;

      if (!cb) {
        this.goToPage(page);

        this.$router.replace({ query }).catch(() => {});
        return;
      }

      cb(query, page);

      this.setIsFullpageRefresh = false;
    },
    onEnterHomeRoute(query, page) {
      this.$router
        .replace({ query })
        .then(() => {
          this.goToPage(page);
        })
        .catch(() => {});
    },
    goToPage(page) {
      this.dynamicRoutes.forEach((route) => {
        if (route.page === page) {
          this.$refs.homeFullpage.goToPage(route.id);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
