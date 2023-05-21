const authRouter = require('./auth.route')
const userRouter = require('./user.route')
const productRouter = require('./product.route')

function routes(app) {
  app.use('/api/auth', authRouter)
  app.use('/api/users', userRouter)
  app.use('/api/products', productRouter)
}

module.exports = routes
