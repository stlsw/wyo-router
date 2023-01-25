const webpack = require("webpack");
const StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  // target: "node",
  mode: "production", // production development
  entry: "./src/index.ts",
  output: {
    clean: true,
    iife: true,
    filename: "index.prod.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }],
  },
};
