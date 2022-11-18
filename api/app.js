const express = require('express');
var bodyParser = require("body-parser")
const mongoose = require('mongoose');
const noteRouter = require('./routes/note')
const listRouter = require('./routes/list')
const Note = require('./models/note')
const Image = require('./models/image')
const List = require('./models/list')

var fs = require('fs');
var path = require('path');
// require('dotenv/config');

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))

const dbURI = 'mongodb+srv://camelia:U602QFjVSTWIyyPv@cluster0.66mkkg3.mongodb.net/NotesAppDB?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

app.use('/', noteRouter);
app.use('/', listRouter);

app.get('/', async (req, res) => {
  res.redirect('main.html');
});

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

app.post('/add-image', upload.single('image'), (req, res, next) => {

    var obj = {
      // name: req.body.name,
      // desc: req.body.desc,
      image: {
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req?.file?.filename)),
          contentType: 'image/png'
      }
  }
  Image.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          res.redirect('/');
      }
  });
});

app.get('/get-image', (req, res) => {
  Image.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
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