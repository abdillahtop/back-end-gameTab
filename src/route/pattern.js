const express = require('express')
const Route = express.Router()

const PatternController = require('../controllers/pattern')
const Auth = require('../helpers/auth')

Route
    .all('/', Auth.authInfo)
    .get('/', PatternController.getPattern)
    .post('/', PatternController.postPattern)
    .post('/:patternid', PatternController.updatePattern)
    .delete('/:scoreid', PatternController.delPattern)

module.exports = Route
