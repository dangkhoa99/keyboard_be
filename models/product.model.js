const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    description: { type: String, maxlength: 1000 },
    price: { type: Number, default: 0 },
    imageLinks: { type: [String] },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Product', productSchema)
