<template>
  <div class="navigation">
    <div class="navigation__left">
      <NuxtLink :to="{ path: '/', query: { page: 'home' } }">
        <img
          class="navigation__logo"
          v-if="!isBlackNavbar"
          src="../../assets/images/ep-logo-white.png"
          alt="logo white"
        />
        <img
          class="navigation__logo"
          v-else
          src="../../assets/images/ep-logo-black.png"
          alt="logo black"
        />
      </NuxtLink>
    </div>
    <div class="navigation__right">
      <div
        ref="navigationBtn"
        class="navigation__icon-wrapper"
        @click="toggleMenu"
      >
        <div
          class="navigation__hamburger"
          :class="{ isBlackNavbar: isBlackNavbar }"
        ></div>
      </div>
    </div>
    <div ref="menuOverlay" class="navigation-overlay">
      <div class="navigation-overlay__wrapper">
        <ul>
          <li>
            <NuxtLink
              @click.native.prevent="toggleMenu"
              :to="{ path: '/', query: { page: 'home' } }"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink @click.native.prevent="toggleMenu" to="/projects"
              >Projects</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              @click.native.prevent="toggleMenu"
              :to="{ path: '/', query: { page: 'about' } }"
              >About</NuxtLink
            >
          </li>
          <li>
            <NuxtLink @click.native.prevent="toggleMenu" to="/resume"
              >Resume</NuxtLink
            >
          </li>
          <li>
            <NuxtLink @click.native.prevent="toggleMenu" to="/contact"
              >Contact</NuxtLink
            >
          </li>
        </ul>
        <div class="brand-wrapper">
          <a
            href="https://www.linkedin.com/in/emil-pedersen-6320ab124/"
            target="__blank"
          >
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/EmilPedersenDev" target="__blank">
            <i class="fab fa-github-square"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "e-navigation",
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      isBlackNavbar: "navbar/IS_BLACK_NAVBAR",
    }),
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      let navBtn: any = this.$refs.navigationBtn;
      let navOverlay: any = this.$refs.menuOverlay;
      let body: any = document.querySelector("body");

      if (this.isOpen) {
        navBtn?.classList.add("open");
        navOverlay.classList.add("open");
        body.style.overflowY = "hidden";
      } else {
        navBtn.classList.remove("open");
        navOverlay.classList.remove("open");
        if (this.$route.path === "/projects") {
          body.style.overflowY = "auto";
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.navigation {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.875rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  .navigation__left {
    display: flex;
    justify-content: space-between;
    .navigation__logo {
      width: 1.875rem;
      height: auto;
      vertical-align: middle;
    }
  }
  .navigation__right {
    z-index: 25;
    .navigation__icon-wrapper {
      height: 5rem;
      width: 5rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 0.75rem;
      @include rw-respond-above(m) {
        justify-content: center;
        padding: 0;
      }

      &:hover {
        cursor: pointer;
      }

      &.open {
        .navigation__hamburger {
          transform: translateX(-3.125rem);
          background: transparent;
          box-shadow: none;
          &::before {
            background: #fff !important;
            transform: rotate(45deg) translate(2.1875rem, -2.1875rem);
          }
          &::after {
            background: #fff !important;
            transform: rotate(-45deg) translate(2.1875rem, 2.1875rem);
          }
        }
      }
      .navigation__hamburger {
        width: 1.25rem;
        height: 0.125rem;
        border-radius: 0.3125rem;
        background: #fff;
        box-shadow: 0 0.125rem 0.3125rem rgba(255, 101, 47, 0.2);
        transition: all 0.3s ease;
        &.isBlackNavbar {
          background: #000;
          &::before,
          &::after {
            background: #000;
          }
        }
        &::before,
        &::after {
          content: "";
          position: absolute;
          width: 1.875rem;
          height: 0.125rem;
          background: #fff;
          border-radius: 0.3125rem;
          transition: all 0.3s ease;
          box-shadow: 0 0.125rem 0.3125rem rgba(255, 101, 47, 0.2);
        }

        &::before {
          transform: translateY(-0.75rem);
        }

        &::after {
          transform: translateY(0.75rem);
        }
      }
    }
  }

  .navigation-overlay {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 0%;
    z-index: 20;
    background: #000;
    transition: all 0.5s ease;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    .navigation-overlay__wrapper {
      ul {
        margin: 0;
        padding: 0;
        display: none;
        li {
          list-style-type: none;
          a {
            position: relative;
            text-decoration: none;
            color: #fff;
            font-size: 2.625rem;
            &::after {
              transition: all 0.3s ease-in-out;
              position: absolute;
              bottom: 0;
              left: 0;
              content: "";
              background: #fff;
              width: 0;
              height: 0;
              opacity: 0;
            }

            &:hover {
              &::after {
                opacity: 1;
                height: 0.125rem;
                width: 100%;
              }
            }
          }
        }
      }
      .brand-wrapper {
        display: none;
        justify-content: center;
        align-items: center;
        margin-top: 1.25rem;

        .fab {
          color: $white;
          font-size: 1.875rem;
          transition: all $animation-short-duration ease;
          &:hover {
            cursor: pointer;
            &.fa-linkedin {
              color: #2867b2;
            }
            &.fa-github-square {
              color: #c9510c;
            }
          }
          &.fa-linkedin {
            margin-right: 1.25rem;
          }
        }
      }
    }
    &.open {
      height: 100vh;
      width: 100%;
      opacity: 1;
      visibility: visible;
      .navigation-overlay__wrapper {
        ul {
          display: block;
        }
        .brand-wrapper {
          display: flex;
        }
      }
    }
  }
}
</style>
