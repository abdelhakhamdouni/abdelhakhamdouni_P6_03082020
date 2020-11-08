const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    email: {type: String, required: true, max: 100, unique: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('user', userShema, 'user')