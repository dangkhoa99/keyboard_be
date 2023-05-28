const { Statuses } = require('../common/constants/constants')
const Product = require('../models/product.model')

// access: private
const ProductController = {
  // GET /products
  list: async (req, res) => {
    try {
      const products = await Product.find()
        .populate({
          path: 'category',
          select: ['_id', 'name'],
        })
        .sort({ createdAt: 'desc' })
      res.status(200).json(products)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // GET /products/:id
  show: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // POST /products
  create: async (req, res) => {
    try {
      const product = await Product.create(req.body)
      res.status(201).json(product)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // PATCH /products/:id
  edit: async (req, res) => {
    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      )

      res.status(200).json(updateProduct)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // DELETE /products/:id
  delete: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },
}

module.exports = ProductController
