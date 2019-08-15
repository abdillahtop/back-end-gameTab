const patternModels = require('../models/pattern')
const miscHelper = require('../helpers/helpers')

module.exports = {
    getPattern: (req, res) => {
        patternModels.getPattern()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    postPattern: (req, res) => {
        const data = {
            pattern: req.body.pattern,
            status: 'not used'
        }
        patternModels.postPattern(data)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    updatePattern: (req, res) => {
        const patternid = req.params.patternid
        const data = {
            pattern: req.body.pattern,
            status: 'used'
        }
        patternModels.updatePattern(data, patternid)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    delPattern: (req, res) => {
        const patternid = req.params.patternid
        patternModels.delPattern(patternid)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

