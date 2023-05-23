const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { Statuses } = require('../common/constants')

const authController = {
  // POST /api/auth/signUp
  // access: public
  signUp: async (req, res) => {
    const { username, password } = req.body

    if (!username) {
      return res.status(400).json({
        message: 'Username is required.',
        status: Statuses.ERROR,
        code: 400,
      })
    }

    if (!password) {
      return res.status(400).json({
        message: 'Password is required.',
        status: Statuses.ERROR,
        code: 400,
      })
    }

    const userExists = await User.findOne({ username })

    if (userExists) {
      return res.status(400).json({
        message: 'Username already exists.',
        status: Statuses.ERROR,
        code: 400,
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      password: hashedPassword,
    })

    if (newUser) {
      return res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        name: newUser.name,
      })
    } else {
      return res.status(400).json({
        message: 'User data is not valid',
        status: Statuses.ERROR,
        code: 400,
      })
    }
  },

  // POST /api/auth/signIn
  // access: public
  signIn: async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
      res.status(400).json({
        message: 'Username and password is required.',
        status: Statuses.ERROR,
        code: 400,
      })
    }

    const user = await User.findOne({ username }).select('+password')

    // compare password with hashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: '1d' }, // 1 day
      )
      return res.status(200).json({
        userId: user.id,
        role: user.role,
        token: {
          value: accessToken,
          type: 'Bearer',
        },
      })
    } else {
      return res.status(401).json({
        message: 'Invalid username or password',
        status: Statuses.ERROR,
        code: 401,
      })
    }
  },

  // POST /api/user/whoami
  // access: private
  whoAmI: async (req, res) => {
    return res.status(200).json(req.user)
  },
}

module.exports = authController
