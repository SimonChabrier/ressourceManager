const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  // ajout pour le chargement des variables scss dans tous les composants vue
  chainWebpack: (config) => {
    config.module
      .rule("scss")
      .oneOf("vue")
      .use("style-resources-loader")
      .loader("style-resources-loader")
      .options({
        patterns: [path.resolve(__dirname, "src/assets/styles/_vars.scss")],
      });
  },
  // configuration de base
  transpileDependencies: true,
});
