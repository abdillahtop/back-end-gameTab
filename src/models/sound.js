const connection = require('../configs/db')

module.exports = {
    getSound: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tb_button', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getSoundbyId: (buttonid) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tb_button WHERE id_button = ?', buttonid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    postSound: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tb_button SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    delSsound: (buttonid) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE tb_button WHERE id_button = ?', buttonid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}