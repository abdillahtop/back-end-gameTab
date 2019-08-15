const express = require('express')
const Route = express.Router()

const ButtonController = require('../controllers/button')
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
    .get('/', ButtonController.getButton)
    .get('/:buttonid', ButtonController.getButtonbyId)
    .post('/', upload.single('music'), ButtonController.postButton)
    .delete('/:buttonid', ButtonController.delButton)

module.exports = Route
