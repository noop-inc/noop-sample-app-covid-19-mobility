const express = require("express");
const app = express();
const path = require("path");
const logger = require("@rearc/noop-log");

app.use(logger.requestLogger);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(80);