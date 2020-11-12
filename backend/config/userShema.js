const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        max: 100, 
        unique: true,
        validate:{
            validator: function(v){
                return /([\w-\.]{5,50}@[\w\.]{3,}\.{1}[\w]+)/.test(v)
            },
            message: props => "L'adresse email n'est pas valide"
        }
    },
    password: {
        type: String, 
        required: true,
        validate:{
            validator: function(v){
                return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/.test(v)
            },
            message: props => "Votre mot de passe doit contenir 8 caractères au minimum, une majuscule et un caractere !"
        }
    }
})

module.exports = mongoose.model('user', userShema, 'user')