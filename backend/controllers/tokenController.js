const jwt = require('jsonwebtoken')
const secretString = process.env.SECRET_STRING

module.exports = {
    send: (req, res, next)=>{
                jwt.sign({
                    email: req.user.email,
                    userId: req.user.id
                },secretString,(err, token)=>{
                    if(err){
                        res.json({
                            error: 'erreur lors de la génération du token !'
                        })
                    }
                    res.json({
                        token,
                        userId: req.user.id
                    }) 
                })
            },
    verify:  (req, res, next)=>{
                    let token = req.headers.authorization.split(' ')[1]
                    jwt.verify(token, secretString, (err, decoded)=>{
                        if(!err){
                            req.userId = decoded.userId
                            next()
                        }else{
                            res.status(403)
                            res.json({error: "Vous n'êtes pas authoriser à accéder à cette page !"})
                        }
                    })
                    
                }
}