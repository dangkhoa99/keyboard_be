const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const authController = {
  // desc: sign up
  // route: POST /api/auth/signUp
  // access: public
  signUp: async (req, res) => {
    const { username, password, name } = req.body

    if (!username || !password || !name) {
      return res
        .status(400)
        .json({ message: 'Username, password and name is required.' })
    }

    const userExists = await User.findOne({ username })

    if (userExists) {
      return res.status(400).json({ message: 'Username already exists.' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
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
      return res.status(400).json({ message: 'User data is not valid' })
    }
  },

  // desc: sign in
  // route: POST /api/auth/signIn
  // access: public
  signIn: async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password is required.' })
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
        { expiresIn: '1d' },
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
      return res.status(401).json({ message: 'Invalid username or password' })
    }
  },

  // desc: Current user info
  // route: POST /api/user/whoami
  // access: private
  whoAmI: async (req, res) => {
    return res.status(200).json(req.user)
  },
}

module.exports = authController
