const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
//const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require("dotenv").config({ path: "./.env" });

module.exports = {
  entry: ["react-hot-loader/patch", "./src/ui/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: "source-map",
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@components": path.resolve(__dirname, "src/ui/components/"),
      "@containers": path.resolve(__dirname, "src/ui/containers/"),
      "@constants": path.resolve(__dirname, "src/ui/constants/"),
      "@layouts": path.resolve(__dirname, "src/ui/layouts/"),
      "@pages": path.resolve(__dirname, "src/ui/pages/"),
      "@routes": path.resolve(__dirname, "src/ui/routes/"),
      "@styles": path.resolve(__dirname, "src/ui/styles/"),
      "@icons": path.resolve(__dirname, "src/ui/assets/icons/"),
      "@logos": path.resolve(__dirname, "src/ui/assets/logos/"),
      "@hooks": path.resolve(__dirname, "src/ui/hooks/"),

      "@utils": path.resolve(__dirname, "src/ui/utils/"),

      "@infrastructure": path.resolve(__dirname, "src/infrastructure/"),
      "@sagas": path.resolve(__dirname, "src/infrastructure/sagas/"),
      "@proxy": path.resolve(__dirname, "src/infrastructure/proxy/"),
      "@network": path.resolve(__dirname, "src/infrastructure/network/"),

      "@application": path.resolve(__dirname, "src/application/"),
      "@redux": path.resolve(__dirname, "src/application/config/redux/"),
      "@slices": path.resolve(__dirname, "src/application/config/redux/slices/"),
      "@actions": path.resolve(
        __dirname,
        "src/application/config/redux/actions"
      ),
      "@services": path.resolve(__dirname, "src/application/config/services"),

      "@domain": path.resolve(__dirname, "src/domain/"),
      "@entities": path.resolve(__dirname, "src/domain/entities"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: /src/,
      },
      {
        test: /\.(js|jsx)$/,
        use: "react-hot-loader/webpack",
        include: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new htmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new miniCssExtractPlugin({
      filename: "[name].css",
    }),
    //new bundleAnalyzerPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: `${process.env.SERVER_URL}`,
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
      "/mocki": {
        target: `${process.env.MOCKI_URL}:${process.env.MOCKI_PORT}`,
        pathRewrite: { "^/mocki": "" },
        changeOrigin: true,
      },
    },
  },
};