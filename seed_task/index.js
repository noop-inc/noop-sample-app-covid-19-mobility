const http = require("http");
const AWS = require("aws-sdk");

const endpoint = process.env.DB_ENDPOINT;
const TableName = process.env.DB_TABLENAME;

AWS.config.update({ endpoint: endpoint });

const dynamodb = new AWS.DynamoDB();

const documentClient = new AWS.DynamoDB.DocumentClient({
    service: dynamodb,
});

const uploadData = async (params) => {
    await documentClient.put(params, (err, data) => {
        if (err) {
            console.error(
                "Unable to add data",
                params.Item.name,
                params.Item.type,
                ". Error JSON:",
                JSON.stringify(err, null, 2)
            );
        }
    });
    return true;
};

const formatData = async (data) => {
    console.log("Start Seeding Data");
    for (const Item of data) {
        const params = {
            TableName,
            Item,
        };
        await uploadData(params);
    }
    console.log("End Seeding Data");
    return true;
};

const getData = () => {
    http.get("http://localapp/data", (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", async () => {
            await formatData(JSON.parse(data));
            return true;
        });
    }).on("error", (err) => {
        console.error("Error " + err.message);
    });
};

const init = () => {
    dynamodb.describeTable({ TableName }, async (err, data) => {
        if (err) {
            console.error(
                "Unable to check items in table",
                ". Error JSON:",
                JSON.stringify(err, null, 2)
            );
        } else if (data.Table.ItemCount === 0) {
            await getData();
        } else {
            console.log("Data is already seeded.");
        }
    });
};

init();
