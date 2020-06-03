const AWS = require("aws-sdk");

const endpoint = process.env.DB_ENDPOINT;
const table = process.env.DB_TABLENAME;

AWS.config.update({ endpoint: endpoint });

const dynamodb = new AWS.DynamoDB();

const documentClient = new AWS.DynamoDB.DocumentClient({
    service: dynamodb,
});

module.exports = {
    table,
    dynamodb,
    documentClient,
};
