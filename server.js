const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const routes = require('./routes')
const db = require('./configs/dbConnection')

dotenv.config()

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
