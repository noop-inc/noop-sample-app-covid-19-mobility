const express = require("express");
const router = express.Router();
const documentClient = require("../../config/aws").documentClient;
const TableName = require("../../config/aws").table;

router.get("/:name/:type", (req, res) => {
    const sourceName = req.params.name;
    const sourceType = req.params.type;
    const params = {
        TableName,
        Key: {
            sourceName,
            sourceType,
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

module.exports = router;
