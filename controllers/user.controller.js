const { Statuses } = require('../common/constants')
const User = require('../models/user.model')

// access: private
const UserController = {
  // GET /users
  list: async (req, res) => {
    try {
      const users = await User.find().sort({ createdAt: 'desc' })
      res.status(200).json(users)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // GET /users/:id
  show: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // POST /users
  create: async (req, res) => {
    try {
      const user = await User.create(req.body)
      res.status(201).json(user)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // PATCH /users/:id
  edit: async (req, res) => {
    try {
      const { username, password, role, ...other } = req.body

      if (username) {
        return res.status(400).json({
          message: 'Username cannot be changed',
          status: Statuses.ERROR,
          code: 400,
        })
      }

      // Handle in route: /auth/changePassword
      if (password) {
        return res.status(400).json({
          message: 'User does not have permission to change password',
          status: Statuses.ERROR,
          code: 400,
        })
      }

      const emailExists = await User.findOne({ email: other.email })

      if (emailExists) {
        return res.status(400).json({
          message: 'Email already exists.',
          status: Statuses.ERROR,
          code: 400,
        })
      }

      const updateUser = await User.findByIdAndUpdate(req.params.id, other, {
        new: true,
      })

      res.status(200).json(updateUser)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // DELETE /users/:id
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

module.exports = UserController
