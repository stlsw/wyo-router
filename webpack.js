const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  // target: "node",
  mode: "production",
  entry: "./src/route.ts",
  output: {
    clean: true,
    iife: true,
    filename: "index.prod.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
      // {
      //   test: /\.ts$/,
      //   loader: StringReplacePlugin.replace({
      //     replacements: [
      //       {
      //         pattern: "__DOMAIN_HOLDER__",
      //         replacement: function () {
      //           return "https://m.wyo.is";
      //         },
      //       },

      //       {
      //         pattern: "__DD_HOST__",
      //         replacement: function () {
      //           return "stakcpath-merchants-manager";
      //         },
      //       },
      //     ],
      //   }),
      // },
    ],
  },
  // plugins: [new CompressionPlugin()],
};
