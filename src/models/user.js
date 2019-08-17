const connection = require('../configs/db')

module.exports = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tb_users', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tb_users SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                    connection.query('INSERT INTO tb_score SET id_user = ?, score = 0', [data.id_user])
                } else {
                    reject(err)
                }
            })
        })
    },

    login: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT a.id_user, name, email, password, salt, b.role_name,created_at, updated_at FROM tb_users a  JOIN tb_role b ON a.id_role = b.id_role WHERE email = ? ORDER BY score DESC', email, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    updateToken: (email, token) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE tb_users SET token = ? WHERE email = ? ', [token, email], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    deleteToken: (userid) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE tb_users SET token = ? WHERE id_user = ?', ['test', userid], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}