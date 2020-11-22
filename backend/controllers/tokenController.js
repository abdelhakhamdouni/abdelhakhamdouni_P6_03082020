const jwt = require('jsonwebtoken')
const secretString = process.env.SECRET_STRING

module.exports = {

    /**
     * Générer le token et l'envoyer au prochaine midleware
     * @param {String} email
     * @param {String} password
     */
    send: (req, res, next)=>{
            jwt.sign(
                { email: req.user.email, userId: req.user.id },
                secretString,(err, token)=>{
                    if(err){
                        res.status(400)
                        res.json({ err })
                    }
                    res.json({ token, userId: req.user.id }) 
                }
            )
        },
    
    /**
     * Verifier le token 
     * @param {String} Authorisation dans le header
     */
    verify:  (req, res, next)=>{
                    let token = req.headers.authorization.split(' ')[1]
                    jwt.verify(token, secretString, (err, decoded)=>{
                        if(!err){
                            req.userId = decoded.userId
                            next()
                        }else{cd  
                            res.status(401)
                            res.json({error: "Vous n'êtes pas authoriser à accéder à cette page !" + err})
                        }
                    })
                    
                }
}