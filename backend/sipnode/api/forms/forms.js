const express = require('express');
const router = express.Router();
const formmodel = require('../../models/forms/forms_model')
router.post('', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }
    let model = new formmodel(req.body)
    model.upVotes = 0
    model.downVotes = 0
    model.dVoted = false
    model.uVoted = false
    model.noComments = 0
    model.save()
        .then(doc => {
            console.log(model.createdAt)
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
router.get('', (req, res) => {
    console.log("get req")
    formmodel.find({})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    formmodel.find({
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
router.delete('/:id', (req, res) => {
    id_no = req.params.id
    console.log(id_no)
    formmodel.findOneAndRemove({
            _id: id_no
        })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
router.put('/:id', (req, res) => {
    console.log(req.params.id)
    formmodel.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        })
        .then(doc => {
            console.log(doc)
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log("some error")
        })
})
module.exports = router;