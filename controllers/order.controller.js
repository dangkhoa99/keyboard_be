const { Statuses } = require('../common/constants/constants')
const Order = require('../models/order.model')

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
    try {
      const order = await Order.create(req.body)
      res.status(201).json(order)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
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
