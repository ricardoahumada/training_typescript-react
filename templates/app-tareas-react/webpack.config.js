const path = require("path");
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); //BundleAnalyzer

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader", // -> esbuild-loader -> descomentar options
          // options: {
          //   loader: "tsx",
          //   target: "es2020",
          // },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Sistema de Tareas - React",
    }),
    new webpack.HotModuleReplacementPlugin(), // HotModuleReolacement,
    //BundleAnalyzer
    // new BundleAnalyzerPlugin({ 
    //   analyzerMode: 'static',    // 'server' = abre navegador, 'static' = genera HTML
    //   openAnalyzer: true,         // Abrir automáticamente
    //   reportFilename: 'bundle-report.html',
    // }),
  ],
  devServer: {
    static: "./dist",
    hot: false, // HotModuleReolacement: true
    port: 3000,
  },
};
