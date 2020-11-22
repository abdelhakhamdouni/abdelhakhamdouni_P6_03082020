const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const cors = require('cors')
const app = express()
const authRouter = require('./routes/auth')
const sauceRouter = require('./routes/sauce')



require('./config/connectDB') // connection à la base de donnée
app.use(cors()) // Gérer les cors pour les connections externe
app.use(express.json()) // gérer le json dans le body 
app.use(express.urlencoded({extended : true})) // gérer l'object dans le body
app.use('/images',express.static(path.join(__dirname, '/images')))// servir les images depuis le dossier image

// les principale routes de cette api
app.use('/api/auth',authRouter)
app.use('/api/sauces', sauceRouter)

module.exports = app
