const userModels = require('../models/user')
const miscHelper = require('../helpers/helpers')
const jwt = require('jsonwebtoken')

module.exports = {
    getUsers: (req, res) => {
        userModels.getUsers()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    register: (req, res) => {
        const salt = miscHelper.generateSalt(18)
        const passwordHash = miscHelper.setPassword(req.body.password, salt)

        const data = {
            name: req.body.name,
            email: req.body.email,
            password: passwordHash.passwordHash,
            salt: passwordHash.salt,
            token: 'test',
            id_role: 2,
            created_at: new Date(),
            updated_at: new Date()
        }
        userModels.register(data)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                miscHelper.response(res, null, 404, "Email not Available!")
            })
    },

    login: (req, res) => {
        const email = req.body.email
        const password = req.body.password
        userModels.login(email)
            .then((result) => {
                const dataUser = result[0]
                const usePassword = miscHelper.setPassword(password, dataUser.salt).passwordHash
                console.log("Use password", usePassword)
                console.log("datauser", dataUser.password)
                if (usePassword === dataUser.password) {
                    dataUser.token = jwt.sign({
                        userid: dataUser.id_user
                    }, process.env.SECRET_KEY, { expiresIn: '1h' })

                    delete dataUser.salt
                    delete dataUser.password

                    userModels.updateToken(email, dataUser.token)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    return miscHelper.response(res, dataUser, 200)
                } else {
                    return miscHelper.response(res, null, 403, 'Wrong password!')
                }

            })
            .catch((error) => {
                miscHelper.response(res, error, 404)
            })
    },

    logout: (req, res) => {
        const userid = req.params.userid
        userModels.deleteToken(userid)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}