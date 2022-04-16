module.exports = {
  devServer: {
    public: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://119.207.128.97//api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  outputDir: "../backend/public",
  transpileDependencies: ["vuetify"],
};
