const mongoose = require('mongoose')
const user = process.env.rootUser
const mdp = process.env.rootMdp
const host = process.env.host
const dbName = process.env.dbName
const connectString = `mongodb+srv://${user}:${mdp}@${host}/${dbName}?retryWrites=true&w=majority`
const connect = mongoose.connect(connectString,{
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        .then(()=>{console.log('MONGO: connect  to db whith success')})
        .catch(err => console.log(err.message))

module.exports = connect;