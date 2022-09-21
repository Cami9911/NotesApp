const express = require('express');
var bodyParser = require("body-parser")
const mongoose = require('mongoose');
const noteRouter = require('./routes/note')
const Note = require('./models/note')

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))

const dbURI = 'mongodb+srv://camelia:AQVmmS5BQEK6aXmo@cluster0.66mkkg3.mongodb.net/NotesAppDB?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

app.use('/', noteRouter);

app.get('/', async (req, res) => {
  res.redirect('main.html');
});

// app.get('/notes', async (req, res) => {
//   await Note.find().sort({ createdAt: 'desc' })
//   .then((result) => {
//     console.log(result)
//     res.redirect('main.html')
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// });



// app.get('/add-note', (req, res) => {
//   const blog = new Note({
//     title: 'test',
//     content: 'content test'
//   })

//   blog.save()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/', (req,res) => {
//   Note.find()
//   .then((result) => {
//     console.log(result)
//   })
//   .catch(err => {
//     console.log(err);
//   });

// })

;