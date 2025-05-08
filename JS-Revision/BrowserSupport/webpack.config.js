const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
  devtool: "cheap-module-source-map",
  devServer: {
    static: "./"
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(), // cleaning the ./dist or ./assets folder in this case for every new build
    // new HtmlWebpackPlugin({
    //   template: "index.html", // Use your existing index.html as a template
    //   filename: "index.html", // Output the HTML file to the root of the dev server
    //   inject: "head", // Inject the script tag into the head
    //   scriptLoading: "module", // Match the production setting
    // }),
  ],
};
