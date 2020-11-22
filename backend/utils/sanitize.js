

module.exports = {

    user : (req,res,next)=>{
        req.body.email = req.sanitise(req.body.email)
        req.body.password = req.sanitise(req.body.password)
        next()
    }

}