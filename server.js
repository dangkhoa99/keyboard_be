require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const db = require('./configs/dbConnection')

const app = express()
const port = process.env.PORT || 5000

// Connect to DB
db.connect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Routes init
routes(app)

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`),
)
