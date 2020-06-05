const express = require("express");
const app = express();
const logger = require("@rearc/noop-log");
const checkSeedStatus = require("./config/seeding_data");
const api = require("./routes/api");

checkSeedStatus();

app.use(logger.requestLogger);
app.use(express.json());
app.use("/api/", api);
app.listen(80);
