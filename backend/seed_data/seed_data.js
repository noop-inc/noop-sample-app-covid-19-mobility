const fs = require("fs");
const path = require("path");
const TableName = require("../config/aws").table;
const dynamodb = require("../config/aws").dynamodb;
const documentClient = require("../config/aws").documentClient;

const uploadParams = async (params) => {
    await documentClient.put(params, (err, data) => {
        if (err) {
            console.error(
                "Unable to add data",
                params.Item.sourceName,
                params.Item.sourceType,
                ". Error JSON:",
                JSON.stringify(err, null, 2)
            );
        }
    });
    return true;
};

const uploadData = async (data) => {
    console.log("Start Seeding Data");
    for (const Item of data) {
        const params = {
            TableName,
            Item,
        };
        await uploadParams(params);
    }
    console.log("End Seeding Data");
    return true;
};

const checkSeedStatus = () => {
    dynamodb.describeTable({ TableName }, async (err, data) => {
        if (err) {
            console.error(
                "Unable to check items in table",
                ". Error JSON:",
                JSON.stringify(err, null, 2)
            );
        } else if (data.Table.ItemCount === 0) {
            const seedData = JSON.parse(
                fs.readFileSync(path.join(__dirname, "data.json"), "utf8")
            );
            await uploadData(seedData);
        } else {
            console.log("Data is already seeded.");
        }
    });
};

module.exports = checkSeedStatus;
