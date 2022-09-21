const express = require('express');
const router = express.Router();
const Note = require('../models/note')

module.exports = router;



router.get('/notes', async (req, res) => {
  await Note.find().sort({ createdAt: 'desc' })
    .then((result) => {
      res.send(result)
      //   res.redirect('main.html')
    })
    .catch((err) => {
      console.log(err)
    })

});

router.post('/add-note', (req, res) => {
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

router.delete('/delete-note/:id', (req, res) => {
  const id = req.params.id;

  Note.findByIdAndDelete(id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err);
    });
});

router.put('/update-note/:id', (req, res) => {
  const id = req.params.id;

  const note = {
    title: req.body.title,
    content: req.body.content
  }

  Note.findByIdAndUpdate(id, note)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err);
    });
});