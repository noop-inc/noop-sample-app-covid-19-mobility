const webpack = require("webpack");
const express = require("express");
const app = express();
const compression = require("compression");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware");
const devConfig = require("./webpack.dev.js");
const compiler = webpack(devConfig);

app.use(compression({ level: 9 }));
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: devConfig.output.publicPath,
        stats: "errors-only",
    })
);
app.use(webpackHotMiddleware(compiler));
app.use(
    ["/api", "/data"],
    createProxyMiddleware({
        target: "https://localnoop.app:1234",
        secure: false,
    })
);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
