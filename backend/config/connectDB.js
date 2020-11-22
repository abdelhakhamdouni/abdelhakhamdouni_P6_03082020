const mongoose = require('mongoose')
const user = process.env.rootUser
const mdp = process.env.rootMdp
const host = process.env.host
const dbName = process.env.dbName

/**
 * l'url de connection 
 */
const connectString = `mongodb+srv://${user}:${mdp}@${host}/${dbName}?retryWrites=true&w=majority`

//Connection a la base de donnée
const connect = mongoose.connect(connectString,{
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
const db = mongoose.connection;

// en cas d'erreur
db.on('error', console.error.bind(console, "Error connecting to db"));

db.once('open', function(){
    console.log("connected to DB"); 
})
        

module.exports = db;