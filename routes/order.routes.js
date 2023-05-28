const express = require('express')
const router = express.Router()
const Order = require('../controllers/order.controller')
const verifyToken = require('../middleware/verifyToken.middleware')

router.use(verifyToken)

router.get('/', Order.list)
router.get('/:id', Order.show)
router.post('/', Order.create)
router.patch('/:id', Order.edit)
router.delete('/:id', Order.delete)

module.exports = router
