const express = require('express');
const router = express.Router();
const usermodel = require('../../models/user/user_model')

router.get('', (req, res) => {
    usermodel.find({})
        .then(doc => {
            // console.log(doc)
            // console.log("user get")
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
router.post('', (req, res) => {
    console.log("post user")
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }
    let model = new usermodel(req.body)
    model.save()
        .then(doc => {
            console.log(model.username)
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
            console.error(err)
        })
})
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    usermodel.find({
            _id: req.params.id
        })
        .then(doc => {
            console.log(doc)
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
module.exports = router;