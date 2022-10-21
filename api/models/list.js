const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
    text:true,
  },
  content: {
    type: Object,
    required: true,
    text:true,
  },
  checked:{
    type: Object,
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

const List = mongoose.model('List', listSchema);
module.exports = List;