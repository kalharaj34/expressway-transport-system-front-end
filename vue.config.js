const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
      overlay: false,
    }
  }
});


