const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AutoPrefixer = require("autoprefixer");

module.exports = {
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                // include: path.resolve(__dirname, "src"),
                use: "vue-loader",
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ["@babel/env", "@vue/babel-preset-jsx"],
                    },
                },
            },
            {
                test: /\.css|\.scss$/,
                // include: path.resolve(__dirname, "src"),
                use: [
                    process.env.NODE_ENV === "production"
                        ? MiniCssExtractPlugin.loader
                        : "style-loader",
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "postcss-loader",
                        query: {
                            plugins: [AutoPrefixer],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            favicon: path.resolve(__dirname, "public", "favicon.png"),
            meta: {
                viewport:
                    "width=device-width, initial-scale=1, shrink-to-fit=no",
            },
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
    optimization: {
        splitChunks: {
            name: "vendors",
            chunks: "all",
        },
    },
};
