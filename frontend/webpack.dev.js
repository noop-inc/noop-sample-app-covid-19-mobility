const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    watch: true,
    devServer: {
        proxy: [
            {
                context: ["/api", "data"],
                target: "https://localnoop.app:1234",
                secure: false,
            },
        ],
    },
});
