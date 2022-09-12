const express = require('express');
const router = express.Router();
const Note = require('../models/note')

module.exports = router;



router.get('/notes', async (req, res) => {
    await Note.find().sort({ createdAt: 'desc' })
    .then((result) => {
      console.log(result)
      res.send(result)
    //   res.redirect('main.html')
    })
    .catch((err) => {
      console.log(err)
    })
  
  });

router.post('/add-note', (req, res) => {
    console.log(req)
  const note = new Note({
    title: req.body.title,
    content: req.body.content
  })

  note.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});