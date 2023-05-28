const mongoose = require('mongoose')
const { Roles, Genders } = require('../common/constants/constants')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: function () {
        return this.username
      },
    },
    phone: { type: String },
    email: { type: String, index: true, unique: true, sparse: true },
    address: { type: String },
    gender: { type: String, default: Genders.OTHER },
    role: { type: String, required: true, default: Roles.ADMIN },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
