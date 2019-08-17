const express = require('express')
const Route = express.Router()

const soundController = require('../controllers/sound')
const Auth = require('../helpers/auth')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage })
// const upload = multer({ dest: 'uploads/' })

Route
    .all('/', Auth.authInfo)
    .get('/', soundController.getSound)
    .get('/:buttonid', soundController.getSoundbyId)
    .post('/', upload.single('music'), soundController.postSound)
    .delete('/:buttonid', soundController.delSound)

module.exports = Route
