const express = require("express");
const app = express();
const router = express.Router();
const AWS = require("aws-sdk");
const compression = require("compression");
const morgan = require("morgan");

const endpoint = process.env.DB_ENDPOINT;
const TableName = process.env.DB_TABLENAME;

AWS.config.update({ endpoint: endpoint });

const dynamodb = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient({
    service: dynamodb,
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
            return res.status(404).json({ error: "data could not be found" });
        }
    });
});

app.use(compression());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/", router);
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server is running on port ${port}`));
