const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    text:true,
  },
  content: {
    type: String,
    required: true,
    text:true,
  },
  important: {
    type: Boolean,
    required: false
  },
  favourite: {
    type: Boolean,
    required: false
  }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;