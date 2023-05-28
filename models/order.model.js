const mongoose = require('mongoose')
const { Statuses } = require('../common/constants/constants')
const Schema = mongoose.Schema

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        price: { type: Number, default: 0 },
        quantity: { type: Number, default: 1 },
      },
    ],
    status: { type: String, default: Statuses.PENDING },
    total: { type: Number, default: 0 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Order', orderSchema)
