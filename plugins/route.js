export default ({ app }) => {
  // Every time the route changes (fired on initialization too)
  app.router.beforeEach((to, from, next) => {
    if (to.path !== "/") {
      if (process.browser) {
        let body = document.getElementsByTagName("body")[0];
        body.style.overflowY = "auto";
      }
    }
    next();
  });
};
