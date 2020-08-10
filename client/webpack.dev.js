const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
    entry: [
        path.resolve(__dirname, "src", "main.js"),
        "webpack-hot-middleware/client",
    ],
    output: {
        publicPath: "/",
    },
    mode: "development",
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
