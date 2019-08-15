const express = require('express')
const Route = express.Router()

const ScoreController = require('../controllers/score')
const Auth = require('../helpers/auth')

Route
    .all('/', Auth.authInfo)
    .get('/', ScoreController.getAllScore)
    .get('/:userid', ScoreController.getScore)
    .post('/', ScoreController.postScore)
    .delete('/:scoreid', ScoreController.delScore)

module.exports = Route
