const express = require('express');
const router = express.Router();
const chatmodel = require('../../models/chat/chat_model')

router.get('/:id', (req, res) => {
    // console.log(req.params.id)
    chatmodel.find({
            _id: req.params.id
        }).limit(30)
        .then(doc => {
            if (doc.length) {
                // console.log(doc[0].messages)
                // console.log(doc)
                res.send(doc[0].messages)
            } else {
                let model = new chatmodel()
                model.messages = []
                model._id = req.params.id
                model.save()
                res.send("")
            }
        })
        .catch(err => {
            console.error(err)
            res.send('some error')
        })
})
router.post('', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }
    let model = new chatmodel(req.body)
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
// router.post('/:id', (req, res) => {
//     id_no = req.params.id
//     console.log(id_no)
//     chatmodel.findOneAndUpdate({
//         _id: id_no
//     }), {
//         $push: {
//             messages: req.body
//         }
//     }
//     // .then(doc => {
//     //     console.log(req.body)
//     //     doc.messages.append(req.body)
//     //     console.log(doc)
//     // // })
//     // .catch(err => {
//     //     res.status(500).json(err)
//     // })
// })
router.post('/:id', (req, res) => {
    console.log("kdjf")
    console.log(req.params.id)
    const id_no = req.params.id
    chatmodel.findById(id_no, (err, p) => {
        p.messages.push({
            "dfhjlk": "fdhijk"
        })
        console.log(p)

    })
    res.send("dkljf")
})
module.exports = router;