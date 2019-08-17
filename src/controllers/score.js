const scoreModels = require('../models/score')
const miscHelper = require('../helpers/helpers')

module.exports = {
    getAllScore: (req, res) => {
        scoreModels.getAllScore()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getScore: (req, res) => {
        const userid = req.params.userid
        scoreModels.getScore(userid)
            .then((resultScore) => {
                const result = resultScore
                scoreModels.getAllScore()
                    .then((results) => {
                        let rank = results.map((item, index) => {
                            if (parseInt(item.id_user) === parseInt(userid)) {
                                return parseInt(index + 1)
                            }
                        })
                        let ranking = rank.find((item) => {
                            return item > 0
                        })
                        console.log("ranking:", ranking)
                        miscHelper.response(res, result, 200, null, ranking)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    },
    postScore: (req, res) => {
        const data = {
            id_user: req.body.userid,
            score: req.body.score
        }
        scoreModels.postScore(data)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    delScore: (req, res) => {
        const scoreid = req.params.scoreid
        scoreModels.delScore(scoreid)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

