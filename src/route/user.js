const express = require('express')
const Route = express.Router()

const UserController = require('../controllers/user')
const Auth = require('../helpers/auth')

Route
    .all('/', Auth.authInfo)
    .get('/', UserController.getUsers)
    .post('/login', UserController.login)
    .post('/register', UserController.register)
    .post('/logout/:userid', UserController.logout)

module.exports = Route
