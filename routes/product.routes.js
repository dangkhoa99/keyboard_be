const express = require('express')
const router = express.Router()
const Product = require('../controllers/product.controller')
const verifyToken = require('../middleware/verifyToken.middleware')

router.use(verifyToken)

router.get('/', Product.list)
router.get('/:id', Product.show)
router.post('/', Product.create)
router.patch('/:id', Product.edit)
router.delete('/:id', Product.delete)

module.exports = router
