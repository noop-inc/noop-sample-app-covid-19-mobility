const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("@rearc/noop-log");
const checkSeedStatus = require("./seed_data/seed_data");
const sources = require("./routes/api/sources");

checkSeedStatus();

app.use(logger.requestLogger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/sources", sources);

app.listen(80);
