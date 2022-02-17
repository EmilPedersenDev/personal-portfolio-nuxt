export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Personal Portfolio - Emil Pedersen",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/fullpage.js/dist/fullpage.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
        integrity:
          "sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/styles/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/route",
    "~/plugins/components",
    "~/plugins/vuelidate",
    { src: "~/plugins/fullpage", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/dotenv",
    "@nuxtjs/style-resources",
  ],

  target: "static",

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["nuxt-fullpage.js"],

  styleResources: {
    scss: ["@/assets/styles/main.scss", "@/assets/styles/__mixins.scss"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { loaders }) {
      loaders.scss.additionalData = '@use "sass:math";';
    },
    transpile: ["vuelidate", "vue-fullpage"],
  },
};
