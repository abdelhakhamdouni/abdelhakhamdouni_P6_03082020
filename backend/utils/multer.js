const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/**
 * Recupérer et enregistrer l'image de la sauce sur le serveur 
 * @param {File} image
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file == undefined) {
            cb()
        }
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        if (file == undefined) {
            cb()
        }
        const extension = MIME_TYPES[file.mimetype]; // Recupérer le type mime de l'image
        // générer un nom unique pour l'image a l'aide du timestamp
        let fileName = file.originalname.replace(' ', '-')
                                        .replace('.' + extension, '') 
                                        + '-' 
                                        + Date.now() 
                                        + '.' 
                                        + extension 
        cb(null, fileName)
    }
})

module.exports = multer({ storage: storage }).single('image');