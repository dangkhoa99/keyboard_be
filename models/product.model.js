const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: { type: String, default: '', required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    images: [{ image: { type: Schema.Types.ObjectId, ref: 'Image' } }],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Product', productSchema)
