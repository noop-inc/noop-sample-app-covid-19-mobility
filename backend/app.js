const express = require("express");
const app = express();
const router = express.Router();
const AWS = require("aws-sdk");
const logger = require("@rearc/noop-log");
const endpoint = process.env.DB_ENDPOINT;
const TableName = process.env.DB_TABLENAME;

app.use(logger.requestLogger);

AWS.config.update({ endpoint: endpoint });

const dynamodb = new AWS.DynamoDB();

const documentClient = new AWS.DynamoDB.DocumentClient({
    service: dynamodb
});

router.get("/:name/:type", (req, res) => {
    const name = req.params.name;
    const type = req.params.type;
    const params = {
        TableName,
        Key: {
            name,
            type,
        },
    };

    documentClient.get(params, (err, data) => {
        if (err) {
            return res.status(400).json({ getError: err });
        } else {
            return res.json(data.Item);
        }
    });
});

app.use(express.json());
app.use("/api/", router);

app.listen(80);
