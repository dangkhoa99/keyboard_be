const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')
const categoryRouter = require('./category.routes')
const productRouter = require('./product.routes')
const orderRouter = require('./order.routes')

function routes(app) {
  app.use('/api/auth', authRouter)
  app.use('/api/users', userRouter)
  app.use('/api/categories', categoryRouter)
  app.use('/api/products', productRouter)
  app.use('/api/orders', orderRouter)
}

module.exports = routes
