const express = require('express');
const router = express.Router();
const Image = require('../models/image')

module.exports = router;

var upload = multer({ storage: storage });


// router.get('/get-image', (req, res) => {
//   Image.find()
//     .then((result) => {
//         res.send(result)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   });

// router.post('/add-image', upload.single('image'), (req, res, next) => {
  
//   var obj = {
//       name: req.body.name,
//       desc: req.body.desc,
//       img: {
//           data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//           contentType: 'image/png'
//       }
//   }
//   Image.create(obj, (err, item) => {
//       if (err) {
//           console.log(err);
//       }
//       else {
//           // item.save();
//           res.redirect('/');
//       }
//   });
// });

// router.get('/all-images', async (req, res) => {
//   await Image.find().sort({ createdAt: 'desc' })
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// });

// router.post('/add-image', (req, res) => {
//   const Image = new Image({
//     title: req.body.title,
//     content: req.body.content,
//     important: req.body.important,
//     favourite: req.body.favourite
//   })

//   Image.save()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// router.delete('/delete-image/:id', (req, res) => {
//   const id = req.params.id;

//   Image.findByIdAndDelete(id)
//     .then(result => {
//       res.send(result)
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });