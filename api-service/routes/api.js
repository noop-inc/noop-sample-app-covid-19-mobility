const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')
const TableName = process.env.DYNAMO_TABLE
const Endpoint = process.env.DYNAMO_ENDPOINT

AWS.config.update({ endpoint: Endpoint })

const dynamodb = new AWS.DynamoDB()
const documentClient = new AWS.DynamoDB.DocumentClient({
  service: dynamodb
})
router.get('/random', (req, res) => {
  // const name = ['Apple', 'Google'][Math.floor(Math.random() * 2)]
  const name = 'Apple'
  const type = ['Countries', 'States'][Math.floor(Math.random() * 2)]
  const params = {
    TableName,
    Key: {
      name,
      type
    }
  }
  documentClient.get(params, (err, data) => {
    if (err) {
      return res.status(400).json(err)
    } else if (data.Item) {
      const meta = data.Item

      const name = Object.keys(meta.data)[
        Math.floor(Math.random() * Object.keys(meta.data).length)
      ]
      const type =
        meta.data[name][Math.floor(Math.random() * meta.data[name].length)]

      const params = {
        TableName,
        Key: {
          name,
          type
        }
      }
      documentClient.get(params, (err, data) => {
        if (err) {
          return res.status(400).json(err)
        } else if (data.Item) {
          return res.json({ meta, mobility: data.Item })
        } else {
          return res.status(404).json('Data could not be found')
        }
      })
    } else {
      return res.status(404).json('Data could not be found')
    }
  })
})

router.get('/:name/:type', (req, res) => {
  const name = req.params.name
  const type = req.params.type
  const params = {
    TableName,
    Key: {
      name,
      type
    }
  }
  documentClient.get(params, (err, data) => {
    if (err) {
      return res.status(400).json(err)
    } else if (data.Item) {
      return res.json(data.Item)
    } else {
      return res.status(404).json('Data could not be found')
    }
  })
})

module.exports = router
