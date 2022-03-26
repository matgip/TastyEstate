module.exports = {
  devServer: {
    public: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
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
