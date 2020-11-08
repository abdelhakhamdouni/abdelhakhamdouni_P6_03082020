const { json } = require('express')
const mongoose = require('mongoose')
const sauceShema = require('../config/sauceShema')
const fs = require('fs')
const url = require('url')
const path = require('path')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

module.exports = {

    getAllSauces : (req, res, next )=>{
        sauceShema.find((err, sauces)=>{
            if(sauces){
                res.json(sauces)
            }
        })
    },
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
                res.status(500)
                res.json({message: "impossible d'ajouter la sauce"  + err})
            }
        })
    },
    getSauceById : (req, res, next)=>{
        let sauceId = req.params.id
        sauceShema.findById(sauceId, (err, sauce)=>{
            if(sauce){
                res.status(200)
                res.json(sauce)
            }
            else{
                console.log(err)
                res.json({error: err})
            }
        })
    },
    editSauce : (req, res, next)=>{
        if(req.body.sauce == undefined){
            sauceShema.findById(req.params.id, (err, sauce)=>{
                sauce.name =  req.body.name
                sauce.manufacturer= req.body.manufacturer
                sauce.description= req.body.description
                sauce.mainPepper= req.body.mainPepper
                sauce.heat= req.body.heat
                
                sauce.save((err, sauceUpdated)=>{
                    console.log('sauce updated:', sauceUpdated)
                    if(err){
                        console.log(err)
                        res.status(202)
                        res.json({err : 'Impossible d\'ajouter la sauce !'})
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
                console.log(sauce)
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
                            console.log(err)
                            res.status(400)
                            res.json({message: 'bdd mise a jour mais l\'image n\'as pas été suprimé !'})
                        })
                    }else{
                        res.status(500)
                        res.json({message: "impossible d'ajouter la sauce"  + err})
                    }
                })
            })
        }
       
    },
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
                            console.log(err)
                            res.status(400)
                            res.json({message: 'bdd mise a jour mais l\'image n\'as pas été suprimé !'})
                        })
                    }else{
                        res.status(403)
                        res.json({message: 'un probleme ampéche de suprimer la sauce !'})
                    }
            
                })
            }else{
                res.status(500)
                res.json({error: "impossible de trouver la sauce à supprimer !"})
            }
        })
            
    },
    likeSauce: (req, res, next)=>{
        let id = req.params.id
        let like = req.body.like

        sauceShema.findById(id,(err, sauce)=>{
            console.log(sauce)
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
    },
    dislikeSauce: (req, res, next)=>{}
}
