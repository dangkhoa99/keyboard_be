const { Statuses, Roles } = require('../common/constants/constants')
const { validateEmail } = require('../common/utils/validateEmail')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

// access: private
const UserController = {
  // GET /users
  // role: superadmin/admin
  list: async (req, res) => {
    const { role } = req.user

    if (role === Roles.USER) {
      return res
        .status(403)
        .json({ message: 'Forbidden', status: Statuses.ERROR, code: '403' })
    }

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
  // role: superadmin/admin
  create: async (req, res) => {
    const { role } = req.user

    if (role === Roles.USER) {
      return res
        .status(403)
        .json({ message: 'Forbidden', status: Statuses.ERROR, code: '403' })
    }

    const { username, password, email } = req.body

    const userExists = await User.findOne({ username })

    if (userExists) {
      return res.status(400).json({
        message: 'Username already exists.',
        status: Statuses.ERROR,
        code: 400,
      })
    }

    if (email || email === '') {
      if (!validateEmail(email)) {
        return res.status(400).json({
          message: 'Invalid email',
          status: Statuses.ERROR,
          code: '400',
        })
      }

      const emailExists = await User.findOne({ email })

      if (emailExists) {
        return res.status(400).json({
          message: 'Email already exists.',
          status: Statuses.ERROR,
          code: 400,
        })
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const user = await User.create({
        ...req.body,
        password: hashedPassword,
      })
      res.status(201).json(user)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // PATCH /users/:id
  // Role: superadmin/admin - Can update all user
  // Role: user - Can only update self
  edit: async (req, res) => {
    const { id, role } = req.user

    if (role === Roles.USER) {
      if (req.params.id !== id) {
        return res.status(403).json({
          message: 'Forbidden',
          status: Statuses.ERROR,
          code: '403',
        })
      }
    }

    try {
      const { username, password, ...other } = req.body

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

      // Role: user - Can not update role
      if (other.role) {
        if (role === Roles.USER) {
          return res.status(403).json({
            message: 'Forbidden',
            status: Statuses.ERROR,
            code: '403',
          })
        }
      }

      if (other.email || other.email === '') {
        if (!validateEmail(other.email)) {
          return res.status(400).json({
            message: 'Invalid email',
            status: Statuses.ERROR,
            code: '400',
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
  // Role: superadmin/admin - Can delete all user
  // Role: user - Can only delete self
  delete: async (req, res) => {
    const { id, role } = req.user

    if (role === Roles.USER) {
      if (req.params.id !== id) {
        return res.status(403).json({
          message: 'Forbidden',
          status: Statuses.ERROR,
          code: '403',
        })
      }
    }
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({
        message: 'Delete Success',
        status: Statuses.SUCCESS,
        code: 200,
      })
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // POST /api/users/changePassword
  // User only can change password yourself
  changePassword: async (req, res) => {
    const { currentPassword, newPassword } = req.body
    const { id } = req.user

    try {
      const user = await User.findById(id).select('+password')

      // compare password with hashedPassword
      if (user && (await bcrypt.compare(currentPassword, user.password))) {
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        user.save()

        res.status(200).json({
          message: 'Change password success',
          status: Statuses.SUCCESS,
          code: 200,
        })
      } else {
        res.status(401).json({
          message: 'Current password is incorrect',
          status: Statuses.ERROR,
          code: 401,
        })
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },
}

module.exports = UserController
