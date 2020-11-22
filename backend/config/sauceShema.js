const mongoose = require('mongoose')

/**
 * Shema de la sauce
 */
sauceShema = mongoose.Schema({
    userId:         {type: String, required: true},
    name:           {type: String, required: true},
    manufacturer:   {type: String, required: true},
    description:    {type: String, required: true},
    mainPepper:     {type: String, required: true},
    imageUrl:       {type: String, required: true},
    heat:           {type: Number, required: true},
    likes:          {type: Number, required: false},
    dislikes:       {type: Number, required: false},
    usersLiked:     {type: [String], required: true},
    usersDisliked:  {type: [String], required: true}

})

module.exports = mongoose.model('sauce', sauceShema, 'sauce')