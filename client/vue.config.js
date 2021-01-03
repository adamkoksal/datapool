const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../public"),
  // assetsDir: "../public",
  pluginOptions: {
    apollo: {
      enableMocks: false,
      enableEngine: false,
    },
  },
};
