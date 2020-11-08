const express = require('express');
const sauceController = require('../controllers/sauceController');
const tokenController = require('../controllers/tokenController');
const router = express.Router();
const multer = require('../utils/multer')

router.get('/',tokenController.verify, sauceController.getAllSauces)
router.get('/:id',tokenController.verify, sauceController.getSauceById)
router.post('/',tokenController.verify, multer, sauceController.addSauce)
router.put('/:id', tokenController.verify, multer, sauceController.editSauce)
router.delete('/:id', tokenController.verify, sauceController.deleteSauce)
router.post('/:id/like',tokenController.verify, multer, sauceController.likeSauce)
router.post('/:id/dislike',tokenController.verify, multer, sauceController.dislikeSauce)

module.exports = router