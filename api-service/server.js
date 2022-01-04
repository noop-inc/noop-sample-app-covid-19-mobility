const express = require('express')
const app = express()
const morgan = require('morgan')
const api = require('./routes/api')

const AWS = require('aws-sdk')
const TableName = process.env.DYNAMO_TABLE
const Endpoint = process.env.DYNAMO_ENDPOINT
AWS.config.update({ endpoint: Endpoint })
const dynamodb = new AWS.DynamoDB()

;(async () => {
  const data = await dynamodb.describeTable({ TableName }).promise()
  console.log(JSON.stringify(data))

  app.use(express.json())
  app.use(morgan('tiny'))

  app.use('/api', api)

  const port = process.env.PORT || 80
  app.listen(port, () => console.log(`Server is running on port ${port}`))
})()
