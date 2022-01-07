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
          @import "@/assets/styles/app.scss";
          @import "@/assets/styles/global.scss";
        `,
      },
    },
  },
};
