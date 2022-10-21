const express = require('express');
const router = express.Router();
const List = require('../models/list')

module.exports = router;

router.post('/add-list', (req, res) => {
    const list = new List({
        title: req.body.title,
        content: req.body.content,
        checked: req.body.checked,
        important: req.body.important,
        favourite: req.body.favourite
    })

    list.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/all-lists', async (req, res) => {
    await List.find().sort({ createdAt: 'desc' })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
});