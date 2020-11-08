const bcrypt = require('bcrypt')
const userShema = require('../config/userShema')

module.exports = {
    signup : (req, res)=>{
                    let email = req.body.email
                    let password = req.body.password
                        userShema.create({email, password}).then(()=>{
                            res.status(201)
                            res.json({message : "user added !"})
                        })
                        .catch(err => {
                            res.status(400)
                            res.json({error : "failled to add user to BDD !"})
                        })
                    },
    signin: (req, res, next)=>{
                console.log(req.body.email)
                userShema.findOne({email: req.body.email},(err, user)=>{
                    if(user == null){
                        res.status(403)
                        res.json({error : "utilisateur non trouvé !"})
                        
                    }else{
                        bcrypt.compare(req.body.password, user.password, (err, resultat)=>{
                            if(err){
                                console.log(err)
                                res.json({error : err})
                            }
                            req.user = user
                            next()
                        })
                    }
                })
            }
}