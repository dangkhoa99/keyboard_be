const productRouter = require('./product')
const siteRouter = require('./site')

function routes(app) {
  app.use('/products', productRouter)
  app.use('/', siteRouter)
}

module.exports = routes
