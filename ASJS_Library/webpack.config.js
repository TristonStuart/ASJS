const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, 'src') + "/library.js",
  output: {
    filename: "asjs.js",
    path: path.resolve(__dirname, 'dist'),
    library: "asjs",
    libraryTarget: "umd"
  },
  mode: "production"
}