const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const authRouter = require('./routes/auth')
const sauceRouter = require('./routes/sauce')

require('./config/connectDB')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/images',express.static(path.join(__dirname, '/images')))

app.use('/api/auth', authRouter)
app.use('/api/sauces', sauceRouter)

module.exports = app
