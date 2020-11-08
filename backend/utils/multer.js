const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file == undefined){
            cb()
        }
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        if(file == undefined){
            cb()
        }
        const extension = MIME_TYPES[file.mimetype];
        let fileName = file.originalname.replace(' ', '-').replace('.'+extension,'') +'-'+ Date.now()+'.'+extension
        cb(null, fileName)
    }
})

module.exports = multer({storage: storage}).single('image');