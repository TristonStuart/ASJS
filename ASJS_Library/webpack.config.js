const path = require("path");

module.exports = {
  entry: "./src/library.js",
  output: {
    filename: "asjs.js",
    path: path.resolve(__dirname, 'dist'),
    library: "ASJS",
    libraryTarget: "umd"
  },
  mode: "production"
}