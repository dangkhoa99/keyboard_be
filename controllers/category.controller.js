const { Statuses } = require('../common/constants/constants')
const Category = require('../models/category.model')

// access: private
const CategoryController = {
  // GET /categories
  list: async (req, res) => {
    try {
      const categories = await Category.find().sort({ createdAt: 'desc' })
      res.status(200).json(categories)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // GET /categories/:id
  show: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id).populate({
        path: 'image',
        select: ['link'],
      })
      res.status(200).json(category)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // POST /categories
  create: async (req, res) => {
    try {
      const category = await Category.create(req.body)
      res.status(201).json(category)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // PATCH /categories/:id
  edit: async (req, res) => {
    try {
      const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      )

      res.status(200).json(updateCategory)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // DELETE /categories/:id
  delete: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id)
      res.status(200).json(category)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },
}

module.exports = CategoryController
