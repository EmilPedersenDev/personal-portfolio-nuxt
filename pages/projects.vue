<template>
  <div class="e-container projects">
    <div class="e-wrapper">
      <div class="showcase-projects">
        <h1>Projects</h1>
        <div
          :ref="'projectCard-' + i"
          class="showcase-projects__card"
          v-for="(project, i) in renderedProjects"
          :key="i"
          :id="'project-' + i"
        >
          <div class="showcase-projects__wrapper">
            <h3>{{ project.name }}</h3>
            <p>"{{ project.description }}"</p>
            <div class="showcase-projects__link">
              <a :href="project.url" target="_blank">Visit site</a>
            </div>
          </div>
        </div>
        <e-observer
          :isDisconnected="isDisconnected"
          v-on:intersecting="loadProject"
        ></e-observer>
      </div>
    </div>
  </div>
</template>

<script>
import allProjects from "../services/models/projects.js";
import Observer from "../components/common/observer/Observer.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    "e-observer": Observer,
  },
  data() {
    return {
      projects: allProjects,
      renderedProjects: [],
      currentIndex: 4,
      numberOfProjects: 7,
      isDisconnected: false,
    };
  },
  mounted() {
    this.setBlackNavbar(false);
    this.renderedProjects = this.projects.filter((project) => project.id < 5);
  },
  methods: {
    ...mapMutations({
      setBlackNavbar: "navbar/SET_BLACK_NAVBAR",
    }),
    loadProject() {
      if (this.currentIndex === this.numberOfProjects) {
        this.isDisconnected = true;
        return;
      }
      let project = this.projects.find((item, i) => {
        if (this.currentIndex === i) {
          return item;
        }
      });

      this.renderedProjects = [...this.renderedProjects, project];

      this.$nextTick(() => {
        this.$refs["projectCard-" + this.currentIndex][0].classList.add(
          "animate"
        );
        this.currentIndex++;
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.e-wrapper {
  .showcase-projects {
    width: 100%;
    h1 {
      margin: 0 auto 3.125rem;
      width: 100%;
      max-width: 37.5rem;
      font-weight: 200;
      letter-spacing: 0.1875rem;
    }
    .showcase-projects__card {
      position: relative;
      width: 100%;
      @media (min-width: 37.5rem) {
        height: 12.5rem;
      }
      height: 15.625rem;

      max-width: 37.5rem;
      background-color: #2d3436;
      background-image: linear-gradient(315deg, #2d3436 0%, #1f1f1f 74%);
      box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.07),
        0 0.125rem 0.25rem rgba(0, 0, 0, 0.07),
        0 0.25rem 0.5rem rgba(0, 0, 0, 0.07), 0 0.5rem 1rem rgba(0, 0, 0, 0.07),
        0 1rem 2rem rgba(0, 0, 0, 0.07), 0 2rem 4rem rgba(0, 0, 0, 0.07);
      border-left: 0.3125rem solid #7232f2;
      margin: 0 auto 1.5625rem;
      padding: 0 0 0 0.625rem;
      overflow: hidden;
      &::after {
        animation: slideFromRight 1s ease;
        content: "";
        position: absolute;
        width: 0%;
        height: 100%;
        background: #7232f2;
        z-index: 2;
        top: 0;
        left: 0;
      }

      &:last-child {
        margin: 0 auto;
      }
      .showcase-projects__wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        position: relative;
        animation: expand 1s ease 1s, fadeIn 2s ease;

        h3,
        p,
        .showcase-projects__link {
          display: flex;
          align-items: center;
        }

        .showcase-projects__link {
          position: absolute;
          bottom: 8%;
          right: 4%;
          transform: translate(-4%, -8%);
          a {
            font-size: 0.75rem;
            position: relative;
            &::before {
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
              &::before {
                opacity: 1;
                height: 0.0625rem;
                width: 100%;
              }
            }
          }
        }

        h3 {
          flex: 1;
          font-weight: 900;
          padding-top: 0.9375rem;
        }
        p {
          flex: 3;
          line-height: 1.5;
          font-size: 0.8125rem;
          width: 100%;
          padding: 0 0.9375rem;
          @include rw-respond-above(m) {
            max-width: 18.75rem;
          }
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-style: italic;
        }
      }
    }
  }
}

@keyframes expand {
  0% {
    transform: translateY(6.25rem);
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slideFromRight {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
