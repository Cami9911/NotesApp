const express = require('express');
const router = express.Router();
const Note = require('../models/note')

module.exports = router;

router.get('/all-notes', async (req, res) => {
  await Note.find().sort({ createdAt: 'desc' })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
});

router.get('/recent-notes', async (req, res) => {
  await Note.find().sort({ createdAt: 'desc' }).limit(8)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
});

router.get('/favourite-notes', async (req, res) => {
  await Note.find({favourite: true }).sort({ createdAt: 'desc' })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
});

router.get('/important-notes', async (req, res) => {
  await Note.find({important: true }).sort({ createdAt: 'desc' })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
});

router.post('/add-note', (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    important: req.body.important,
    favourite: req.body.favourite
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

router.post('/search-note', (req, res) => {

  const search = req.body.search;
  const query = { $text: { $search: search } };

  Note.find(query)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.log(err);
  });
});