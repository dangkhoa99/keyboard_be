const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema(
  {
    link: { type: String },
    cloudinaryId: { type: String },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Image', imageSchema)
