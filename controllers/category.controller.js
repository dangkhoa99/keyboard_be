const Category = require('../models/category.model')

// access: private
const CategoryController = {
  // GET /categories
  list: async (req, res) => {
    try {
      const categories = await Category.find()
      res.status(200).json(categories)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // GET /categories/:id
  show: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id)
      res.status(200).json(category)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // POST /categories
  create: async (req, res) => {
    try {
      const category = await Category.create(req.body)
      res.status(201).json(category)
    } catch (error) {
      res.status(500).json({ message: error.message })
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
      res.status(500).json({ message: error.message })
    }
  },

  // DELETE /categories/:id
  delete: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id)
      res.status(200).json(category)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = CategoryController
