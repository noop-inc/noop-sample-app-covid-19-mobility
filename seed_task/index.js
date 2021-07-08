const AWS = require('aws-sdk')
const fetch = require('node-fetch')

const TableName = process.env.DYNAMO_TABLE
const Endpoint = process.env.DYNAMO_ENDPOINT

AWS.config.update({ endpoint: Endpoint })
const dynamodb = new AWS.DynamoDB()
const documentClient = new AWS.DynamoDB.DocumentClient({
  service: dynamodb
})

let data

const insertData = async () => {
  console.log('Start inserting data')
  try {
    await Promise.all(data.map(async Item => (
      await documentClient.put({ Item, TableName }).promise()
    )))
    console.log('End inserting data')
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

const fetchData = async () => {
  try {
    console.log('Start fetching data')
    const res = await fetch('http://localapp/data.json')
    data = await res.json()
    console.log('End fetching data')
    await insertData()
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

const start = async () => {
  console.log('Start seedTask')
  try {
    const data = await dynamodb.describeTable({ TableName }).promise()
    if (data.Table.ItemCount === 0) {
      await fetchData()
    } else {
      console.log('Data previously seeded')
    }
    console.log('End seedTask')
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

start()
