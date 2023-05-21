const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const UserController = {
  // desc: get list user
  // route: GET /users
  // access: private
  list: async (req, res) => {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // desc: get user by id
  // route: GET /users/:id
  // access: private
  show: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // desc:  create user with info and account
  // route: POST /users
  // access: private
  create: async (req, res) => {
    try {
      const user = await User.create(req.body)
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // desc:  update user info
  // route: PATCH /users/:id
  // access: private
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

  // desc:  delete user by id
  // route: DELETE /users/:id
  // access: private
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
