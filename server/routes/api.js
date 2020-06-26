const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const TableName = process.env.DYNAMO_TABLE;
const Endpoint = process.env.DYNAMO_ENDPOINT;

AWS.config.update({ endpoint: Endpoint });

const dynamodb = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient({
    service: dynamodb,
});

router.get("/random", (req, res) => {
    const params = {
        TableName,
        ProjectionExpression: "#nm, #tp",
        FilterExpression: "#nm <> Apple and #nm <> Google",
        ExpressionAttributeNames: {
            "#nm": "name",
            "#tp": "type",
        },
    };
    documentClient.scan(params, (err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        } else if (data.Items) {
            const randomNum = Math.floor(Math.random() * data.Items.length);
            const params = {
                TableName,
                Key: data.Items[randomNum],
            };

            documentClient.get(params, (err, data) => {
                if (err) {
                    return res.status(400).json({ error: err });
                } else if (data.Item) {
                    return res.json(data.Item);
                } else {
                    return res
                        .status(404)
                        .json({ error: "Data could not be found" });
                }
            });
        } else {
            return res.status(404).json({ error: "Data could not be found" });
        }
    });
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
            return res.status(400).json({ error: err });
        } else if (data.Item) {
            return res.json(data.Item);
        } else {
            return res.status(404).json({ error: "Data could not be found" });
        }
    });
});

module.exports = router;
