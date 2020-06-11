const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src", "main.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                include: path.resolve(__dirname, "src"),
                use: "vue-loader",
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(s*)css$/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV !== "production",
                        },
                    },
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "postcss-loader",
                        query: {
                            plugins: [require("autoprefixer")],
                        },
                    },
                ],
            },
            {
                test: /\.png$/,
                include: path.resolve(__dirname, "public"),
                loader: "file-loader",
                options: {
                    outputPath: "assets",
                },
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public", "favicon.png"),
                    to: path.resolve(__dirname, "dist"),
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
        new VueLoaderPlugin(),
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
