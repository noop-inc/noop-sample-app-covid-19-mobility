const express = require('express')
const app = express()
const morgan = require('morgan')
const api = require('./routes/api.js')

app.use(express.json())
app.use(morgan((tokens, req, res) =>
  JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    'content-length': tokens.res(req, res, 'content-length'),
    'response-time': `${tokens['response-time'](req, res)} ms`
  })
))

app.use('/api', api)

const port = process.env.PORT || 80
const server = app.listen(port, () => console.log(`Server is running on port ${port}`))

process.once('SIGTERM', () => {
  console.log('SIGTERM received')
  server.close(err => {
    console.log(err || 'Server closed')
    process.exit(err ? 1 : 0)
  })
})
