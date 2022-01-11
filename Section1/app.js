const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const artickelRouter = require('./controller/Articles')
const logger = require('./utils/logger')

const url = config.MONGODB_URI
logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
})

app.use(bodyParser.json())
app.use(cors())
app.use('/api/artickels', artickelRouter)

module.exports = app