class SiteController {
  // [GET] /
  index(req, res) {
    res.send('Homepage')
  }

  // [GET] /contact
  contact(req, res) {
    res.send('Contact page')
  }
}

module.exports = new SiteController()
