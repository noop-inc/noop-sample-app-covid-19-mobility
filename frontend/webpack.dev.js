const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        open: true,
        proxy: [
            {
                context: ["/api", "data"],
                target: "https://localnoop.app:1234",
                secure: false,
            },
        ],
        publicPath: "/",
    },
});
