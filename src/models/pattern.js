const connection = require('../configs/db')

module.exports = {
    getPattern: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tb_pattern', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    postPattern: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tb_pattern SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    updatePattern: (data, patternid) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE tb_pattern SET ? WHERE id_pattern = ?', [data, patternid], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    delPattern: (scoreid) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE tb_pattern WHERE id_pattern = ?', scoreid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}