<template>
  <div class="section" id="projects">
    <div class="projects-wrapper">
      <div
        :class="['project-card', isProjectAnimating && 'animate']"
        v-for="(project, i) in projects"
        :key="i"
        :style="{ 'background-image': 'url(' + project.img + ')' }"
        @click="goToLink(project.url)"
      >
        <p>{{ project.name }}</p>
      </div>
    </div>
    <div
      :class="['all-projects', isProjectAnimating && 'animate']"
      @click="$router.push('/projects')"
    >
      <h2>View all projects</h2>
      <img src="../../assets/icons/arrow-right.svg" alt="arrow right" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import allProjects from "../../services/models/projects.js";

interface Project {
  id: string;
  name: string;
  fulltTitle: string;
  description: string;
  url: string;
  img: any;
}

export default Vue.extend({
  name: "e-project-summary",
  props: {
    isProjectAnimating: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      projects: [] as Project[],
    };
  },
  mounted() {
    this.projects = allProjects.filter((project) => {
      if (parseInt(project.id) < 5) {
        return project;
      }
    });
  },
  methods: {
    goToLink(url: string) {
      // window.open(url, "__blank");
    },
  },
});
</script>

<style lang="scss" scoped>
#projects {
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include rw-respond-above(l) {
    justify-content: space-between;

    .projects-wrapper {
      flex: 2;
    }

    .all-projects {
      flex: 1;
    }
  }
  align-items: center;

  .projects-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .projects-wrapper {
    padding-top: 1.25rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12.5rem, 13.75rem));
    width: 80%;
    justify-content: center;
    align-items: flex-end;
    grid-gap: 0.625rem;
    position: relative;
    .project-card {
      height: 15.625rem;
      box-shadow: rgba(0, 0, 0, 0.25) 0 0.875rem 1.75rem,
        rgba(0, 0, 0, 0.22) 0 0.625rem 0.625rem,
        rgba(0, 0, 0, 0.22) 0 0.625rem 0.625rem;
      transition: transform $animation-duration ease $animation-delay,
        opacity $animation-short-duration ease-in $animation-delay,
        visibility $animation-short-duration ease-in $animation-delay,
        background-size $animation-short-duration ease 0s;
      border-radius: 0.3125rem;
      background-repeat: no-repeat;
      background-position: center -0.625rem;
      background-size: 100% auto;
      @include rw-respond-above(m) {
        background-position: center center;
        background-size: auto 100%;
      }
      position: relative;
      &:nth-child(odd),
      &:nth-child(even) {
        opacity: 0;
        visibility: hidden;
      }
      &:nth-child(odd) {
        transform: translateY(-12.5rem);
      }
      &:nth-child(even) {
        transform: translateY(18.75rem);
      }

      &.animate {
        &:nth-child(odd),
        &:nth-child(even) {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        @include rw-respond-above(l) {
          &:nth-child(even) {
            opacity: 1;
            transform: translateY(-1.875rem);
          }
        }
      }
      &:last-child {
        background-position: left center;
      }
      @include rw-respond-below(s) {
        height: 6.25rem;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 0.3125rem;
        background: linear-gradient(to bottom, transparent 0%, black 80%);
      }

      p {
        color: #fff;
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        text-align: center;
        font-weight: 700;
        letter-spacing: 1.3125rem;
      }

      &:hover {
        @include rw-respond-above(m) {
          background-size: auto 120%;
        }
        cursor: pointer;
      }
    }
  }

  .all-projects {
    display: flex;
    align-items: center;
    padding-top: 1.25rem;
    transition: transform $animation-duration ease $animation-delay,
      visibility $animation-short-duration ease-in $animation-delay,
      opacity $animation-short-duration ease-in $animation-delay;
    transform: translateX(-25rem);
    opacity: 0;
    visibility: hidden;
    &.animate {
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
    }
    h2 {
      margin-right: 0.625rem;
      font-size: clamp(0.875rem, 6vw, 2rem);
      color: #000;
    }
    img {
      height: 1.875rem;
      width: 1.875rem;
      animation: bounceRight 2s infinite;
      animation-play-state: paused;
    }

    &:hover {
      cursor: pointer;
      img {
        animation-play-state: running;
      }
    }
  }
}

@keyframes bounceRight {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0.625rem);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
