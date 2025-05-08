const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "assets", "scripts"), // Where Webpack puts the file on the disk.
    publicPath: "assets/scripts/", // The URL fragment the browser uses to find that file from the web server's root.
  },
  devtool: "source-map",
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(), // cleaning the ./dist or ./assets folder in this case for every new build
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "../../index.html",
      inject: "head",
      // scriptLoading: "module", // also adds DEFER
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: { version: 3 } },
              ],
            ],
          },
        },
      },
    ],
  },
};
