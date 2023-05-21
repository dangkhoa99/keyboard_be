const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
  let token

  let authHeader = req.headers.Authorization || req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]

    try {
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT)

      req.user = verified.user

      next()
    } catch (err) {
      res.status(401).json({ message: err.message })
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: 'User is not authorized or token is missing' })
    }
  } else {
    return res
      .status(401)
      .json({ message: 'User is not authorized or token is missing' })
  }
}

module.exports = validateToken
