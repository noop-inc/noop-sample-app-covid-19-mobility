const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devServer: {
        hot: true,
        open: "Google Chrome",
        proxy: [
            {
                context: ["/api", "/data"],
                target: "https://localnoop.app:1234",
                secure: false,
            },
        ],
    },
});
