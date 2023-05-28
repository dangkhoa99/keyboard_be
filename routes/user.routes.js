const express = require('express')
const router = express.Router()
const User = require('../controllers/user.controller')
const verifyToken = require('../middleware/verifyToken.middleware')

router.use(verifyToken)

router.get('/', User.list)
router.get('/:id', User.show)
router.post('/', User.create)
router.patch('/:id', User.edit)
router.delete('/:id', User.delete)

module.exports = router
