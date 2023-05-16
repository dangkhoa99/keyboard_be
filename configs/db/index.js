const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/keyboard_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Connect to MongoDB')
  } catch (error) {
    console.log('Connection error: ', error)
  }
}

module.exports = { connect }
