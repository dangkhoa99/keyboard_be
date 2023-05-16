const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
  name: {
    type: String,
    default: '',
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  description: { type: String, maxlength: 1000 },
  price: { type: Number, default: 0 },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Product', Product)
