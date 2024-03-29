const buttonModels = require('../models/button')
const miscHelper = require('../helpers/helpers')
const cloudinary = require('cloudinary').v2

module.exports = {
    getButton: (req, res) => {
        buttonModels.getButton()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getButtonbyId: (req, res) => {
        const buttonid = req.params.buttonid
        buttonModels.getButtonbyId(buttonid)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    postButton: async (req, res) => {
        let path = req.file.path
        let filename = req.file.filename.replace(/\s/g, '')
        let getUrl = async () => {
            cloudinary.config({
                cloud_name: 'abdi-library-storage',
                api_key: '564346865871912',
                api_secret: 'cq0d7Q1ZvicR0rtZMcAmoHBsQ48'
            })
            const options = { public_id: filename, resource_type: "video", bytes_limit: 50825347 }
            let data
            await cloudinary.uploader.upload(path, options, (error, result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                data = result
            })

            return data
        }
        let result
        await getUrl().then((res) => {
            result = res
            console.log(res);

        }).catch((err) => {
            console.log(err);
        })
        const data = {
            music: `https://res.cloudinary.com/abdi-library-storage/video/upload/v${result.version}/${filename}.${result.format}`,
            name: req.body.name,
            no_button: req.body.noButton
        }

        buttonModels.postButton(data)
            .then((result) => {
                miscHelper.response(res, result, 200)
            }).catch((error) => {
                console.log(error);
            })
    },
    // updateBUtton: (req, res) => {
    //     const buttonid = req.params.buttonid
    //     const data = {
    //         music: req.file.path,
    //         name: req.body.name
    //     }
    //     buttonModels.updateButton(data, buttonid)
    //         .then((result) => {
    //             miscHelper.response(res, result, 200)
    //         })
    //         .catch((error) => {

    //         })
    // },
    delButton: (req, res) => {
        const buttonid = req.params.buttonid
        buttonModels.delButton(buttonid)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

