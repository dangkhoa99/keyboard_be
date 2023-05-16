const Product = require('../models/Product')

class ProductController {
  // [GET] /products
  index(req, res) {
    res.send('Product list')

    Product.find({}, (err, products) => {
      if (!err) {
        res.json(products)
        return
      }

      res.status(500).json({ error: 'message' })
    })
  }

  // [GET] /products/:slug
  show(req, res) {
    res.send('Product detail')
  }
}

module.exports = new ProductController()
