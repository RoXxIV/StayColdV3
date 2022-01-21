module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_variables.scss";
          @import "@/assets/styles/_mixin.scss";
          @import "@/assets/styles/_global.scss";
          @import "@/assets/styles/_animations.scss";
        `,
      },
    },
  },
};
