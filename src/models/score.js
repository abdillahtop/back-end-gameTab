const connection = require('../configs/db')

module.exports = {
    getAllScore: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT a.name, a.updated_at, a.id_user, score FROM tb_users a JOIN tb_score b ON a.id_user = b.id_user ORDER BY score DESC LIMIT 5', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    getScore: (userid) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT a.name, a.updated_at,a.id_user, MAX(score) AS score FROM tb_users a JOIN tb_score b ON a.id_user = b.id_user WHERE a.id_user = ?', userid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    postScore: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tb_score SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    delScore: (scoreid) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE tb_score WHERE id_score = ?', scoreid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}