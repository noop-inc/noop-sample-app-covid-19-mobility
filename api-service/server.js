const express = require('express')
const app = express()
const morgan = require('morgan')
const api = require('./routes/api')

app.use(express.json())
app.use(morgan('tiny'))

app.use('/api', api)

const port = process.env.PORT || 80
app.listen(port, () => console.log(`Server is running on port ${port}`))
