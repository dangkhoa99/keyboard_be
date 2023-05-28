const { Statuses } = require('../common/constants/constants')
const Order = require('../models/order.model')
const Product = require('../models/product.model')

// access: private
const OrderController = {
  // GET /orders
  list: async (req, res) => {
    try {
      const orders = await Order.find()
        .sort({ createdAt: 'desc' })
        .populate({
          path: 'user',
          select: ['_id', 'name', 'address', 'phone', 'email'],
        })
        .populate({
          path: 'products.product',
          // select: ['_id', 'name', 'price'],
        })
      res.status(200).json(orders)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // GET /orders/:id
  show: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
      res.status(200).json(order)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // POST /orders
  create: async (req, res) => {
    const { id } = req.user
    const { products } = req.body

    if (products && products.length > 0) {
      // Check quantity in Product > quantity order
      const isContinue = products.every(({ product: productId, quantity }) => {
        return Product.findById(productId)
          .then((p) => {
            return p.quantity - quantity > 0
          })
          .catch((err) => {
            res
              .status(400)
              .json({ message: err.message, status: Statuses.ERROR, code: 400 })
          })
      })

      // Create a new order and subtract quantity in Product
      if (isContinue) {
        Order.create({ user: id, ...req.body })
          .then((_res) => {
            products.forEach(({ product: productId, quantity }) => {
              return Product.findById(productId)
                .then((p) => {
                  p.quantity = p.quantity - quantity
                  p.save()
                })
                .catch((err) => {
                  _res.status(400).json({
                    message: err.message,
                    status: Statuses.ERROR,
                    code: 400,
                  })
                })
            })

            res.status(201).json(_res)
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message,
              status: Statuses.ERROR,
              code: 500,
            })
          })
      }
    }
  },

  // PATCH /orders/:id
  edit: async (req, res) => {
    try {
      const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      )

      res.status(200).json(updateOrder)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // PATCH /orders/:id/change-status
  editStatus: async (req, res) => {
    // Statues = CANCELED => return quantity in Product
    Order.findById(req.params.id)
      .then((o) => {
        o.status = req.body.status
        o.save()
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: err.message, status: Statuses.ERROR, code: 500 })
      })

    try {
      const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      )

      res.status(200).json(updateOrder)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // DELETE /orders/:id
  delete: async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id)
      res.status(200).json(order)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },
}

module.exports = OrderController
