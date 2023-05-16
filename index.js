const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 5432

const routes = require('./routes')
const db = require('./configs/db')

// Connect to DB
db.connect()

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// HTTP Logger
// app.use(morgan('combined'))

// Routes init
routes(app)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
