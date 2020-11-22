const { json } = require('express')
const mongoose = require('mongoose')
const sauceShema = require('../config/sauceShema')
const fs = require('fs')
const url = require('url')
const path = require('path')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

module.exports = {

    /**
     * Recupérer l'ensambre des sauce dans la BDD
     */
    getAllSauces : (req, res, next )=>{
        sauceShema.find((err, sauces)=>{
            if(sauces){
                res.json(sauces)
            }
        })
    },
    
    /**
     * ajouter une sauce
     * @param {Object} json de la sauce dans le body
     * @param {File} image
     */
    addSauce : (req, res, next)=>{
        let sauce = new sauceShema()
        req.body.sauce = JSON.parse(req.body.sauce)
        let fileName = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        sauce.userId =          req.userId
        sauce.name =            req.body.sauce.name
        sauce.manufacturer =    req.body.sauce.manufacturer
        sauce.description =     req.body.sauce.description
        sauce.mainPepper =      req.body.sauce.mainPepper
        sauce.imageUrl =        fileName
        sauce.heat =            req.body.sauce.heat
        sauce.likes =           0
        sauce.dislikes =        0
        sauceShema.create(sauce, (err, sauce)=>{
            if(sauce){
                res.status(200)
                res.json({message : "sauce ajouté avec succés"})
            }else{
                res.status(400)
                let er = new Error("impossible d'ajouter la sauce")
                res.json({err, er})
            }
        })
    },

    /**
     * recupérer une sauce par son ID
     * @param {Number} id dans l'url
     */
    getSauceById : (req, res, next)=>{
        let sauceId = req.params.id
        sauceShema.findById(sauceId, (err, sauce)=>{
            if(sauce){
                res.status(200)
                res.json(sauce)
            }
            else{
                res.status(400)
                res.json({error: err})
            }
        })
    },

    /**
     * editer une sauce
     * @param {Object} json de la sauce dans le body
     * @param {File} image
     */
    editSauce : (req, res, next)=>{
        if(req.body.sauce == undefined){
            sauceShema.findById(req.params.id, (err, sauce)=>{
                sauce.name =  req.body.name
                sauce.manufacturer= req.body.manufacturer
                sauce.description= req.body.description
                sauce.mainPepper= req.body.mainPepper
                sauce.heat= req.body.heat
                sauce.save((err, sauceUpdated)=>{
                    if(err){
                        res.status(400)
                        let er = new Error('Impossible d\'ajouter la sauce !')
                        res.json({er, err})
                    }else{
                        res.status(202)
                        res.json({message: "sauce mise ajoour avec succés"})
                    }
                })
            })
        }else{
            sauceShema.findById(req.params.id, (err, sauce)=>{
                let sauceImageUrl = new url.URL(sauce.imageUrl)
                sauceImgUrl = sauceImageUrl.pathname

                sauce_ = JSON.parse(req.body.sauce)
                let fileName = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                sauce.name =            sauce_.name
                sauce.manufactruer =    sauce_.manufacturer
                sauce.description =     sauce_.description
                sauce.mainPepper =      sauce_.mainPepper
                sauce.imageUrl =        fileName
                sauce.heat =            sauce_.heat
                sauce.save( (err, sauce)=>{
                    if(sauce){
                        unlinkAsync(path.join('../backend/', sauceImgUrl)).then(()=>{
                            res.status(200)
                            res.json({message : "sauce mise a jour avec succés"})
                        })
                        .then(err => {
                            res.status(400)
                            let er = new Error('bdd mise a jour mais l\'image n\'as pas été suprimé !' )
                            res.json({err, er})
                        })
                    }else{
                        res.status(500)
                        let er = new Error("impossible d'ajouter la sauce")
                        res.json({er, err})
                    }
                })
            })
        }
       
    },

    /**
     * Supprimer une sauce 
     * @param {Number} id de la sauce
     */
    deleteSauce:  (req, res, next)=>{
        let id = req.params.id
        let sauceImgUrl = ""
         sauceShema.findById(id, (err, sauce) =>{     
            if(sauce != null){
                let sauceImageUrl = new url.URL(sauce.imageUrl)
                sauceImgUrl = sauceImageUrl.pathname
                sauceShema.deleteOne({_id: id}, (err, sauce)=>{
                    if(!err){
                        unlinkAsync(path.join('../backend/', sauceImgUrl)).then(()=>{
                            res.status(200)
                            res.json({message: 'sauce suprimé de la base de donnée !'})
                        })
                        .then(err => {
                            res.status(400)
                            let er = new Error('bdd mise a jour mais l\'image n\'as pas été suprimé !')
                            res.json({err, er})
                        })
                    }else{
                        res.status(400)
                        let er = new Error('un probleme ampéche de suprimer la sauce !')
                        res.json({er, err})
                    }
            
                })
            }else{
                res.status(500)
                let er = new Error("impossible de trouver la sauce à supprimer !")
                res.json({err, er})
            }
        })
            
        },
        likeSauce: (req, res, next)=>{
            let id = req.params.id
            let like = req.body.like

            sauceShema.findById(id,(err, sauce)=>{
                if(!err){
                    switch (like){
                        case 1:
                            if(sauce.usersLiked.indexOf(req.body.userId) != -1 ){
                                res.status(200)
                                res.json({message: 'vous avez déja aimé cette sauce'})
                            }else{
                                sauce.likes += req.body.like
                                sauce.usersLiked.push(req.body.userId)
                                sauce.usersDisliked = sauce.usersDisliked.filter(userId => userId != req.body.userId)
                            }
                        break
                        case 0:
                            if(sauce.usersLiked.indexOf(req.body.userId) != -1 ){
                                sauce.likes -= 1
                            }
                            if(sauce.usersDisliked.indexOf(req.body.userId) != -1 ){
                                sauce.dislikes -= 1
                            }
                            sauce.usersDisliked = sauce.usersDisliked.filter(userId => userId != req.body.userId)
                            sauce.usersLiked = sauce.usersLiked.filter(userId => userId != req.body.userId)
                        break
                        case -1:
                            if(sauce.usersDisliked.indexOf(req.body.userId) != -1 ){
                                res.status(200)
                                res.json({message: 'vous avez déja aimé cette sauce'})
                            }else{
                                sauce.dislikes += 1
                                sauce.usersDisliked.push(req.body.userId)
                                sauce.usersLiked = sauce.usersLiked.filter(userId => userId != req.body.userId)
                            }
                        break
                    }
                    sauce.save((err, sauce)=>{
                        if(!err){
                            res.status(200)
                            res.json({message: 'vous avez aimé cette sauce'})
                        }
                    })
                }
            })
        }
}
