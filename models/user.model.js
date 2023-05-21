const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    gender: { type: String },
    role: { type: String, required: true, default: '98-admin' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
