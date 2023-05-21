const express = require('express')
const router = express.Router()
const User = require('../controllers/user.controller')
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken)

router.get('/', User.list)
router.get('/:id', User.show)
// router.post('/:id', User.create)
router.patch('/:id', User.edit)
// router.delete('/:id', User.delete)

module.exports = router
