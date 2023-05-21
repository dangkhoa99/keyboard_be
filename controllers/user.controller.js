const User = require('../models/user.model')

// access: private
const UserController = {
  // GET /users
  list: async (req, res) => {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // GET /users/:id
  show: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // POST /users
  create: async (req, res) => {
    try {
      const user = await User.create(req.body)
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // PATCH /users/:id
  edit: async (req, res) => {
    try {
      const { username, password, role, ...other } = req.body

      if (username) {
        return res.status(400).json({ message: 'Username cannot be changed' })
      }

      // Handle in route: /auth/changePassword
      if (password) {
        return res
          .status(400)
          .json({ message: 'User does not have permission to change password' })
      }

      const updateUser = await User.findByIdAndUpdate(req.params.id, other, {
        new: true,
      })

      res.status(200).json(updateUser)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // DELETE /users/:id
  delete: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
}

module.exports = UserController
