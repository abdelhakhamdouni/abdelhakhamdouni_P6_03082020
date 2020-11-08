module.exports = {

    email:  (req, res, next)=>{
        let email_regex = /([\w-\.]{5,50}@[\w\.]{3,}\.{1}[\w]+)/;
        if(req.body.email.match(email_regex)){
            req.body.email = req.body.email.toLowerCase().trim()
            next()
        }
        else{
            res.status(400)
            res.json({erreur: "l'email entré non valide !"})
        }
    },
    password : (req, res, next)=>{
        let mdp_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/
        let mdp = req.body.password
        if(mdp.length < 8){
            res.status(400)
            res.json({erreur: "Votre mot de passe doit contenir 8 caractères au minimum !"})
        }
        else{
            if(!mdp.match(mdp_regex)){
                res.status(400)
                res.json({erreur: "Votre mot de passe n'est pas valide !"})
            }
            else{
                res.status(200)
                next()
            }
        }
    }
}