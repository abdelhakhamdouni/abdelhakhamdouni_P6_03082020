const bcrypt = require('bcrypt')
const expressSanitizer = require('express-sanitizer');
const userShema = require('../config/userShema')

/**
 * Authentificatio des utilisateurs
 */
module.exports = {
    /**
     * Ajouter un user
     * @param {String} email
     * @param {String} password hash
     */
    signup: (req, res) => {
        let email = req.body.email.toLowerCase()
        let password = req.body.password
        userShema.create({ email, password })
        .then(() => {
            res.status(201)
            res.json({ message: "user added !" })
        })
        .catch(err => {
            res.status(400)
            res.json({ error: "failled to add user to BDD !" + err })
        })
    },


    /**
     * Verifier et login le user
     *  @param {Object} user {email, password}
     */
    signin: (req, res, next) => {
        let email = 
        userShema.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
            if (user == null) {
                res.status(401)
                res.json({ error: "utilisateur non trouvé !" })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, resultat) => {
                    console.log(resultat)
                    if (!resultat) {
                        res.status(403)
                        res.json({ error: err })
                    }else{

                        req.user = user
                        next()
                    }
                })
            }
        })
    }
}