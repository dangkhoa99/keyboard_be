const { Statuses } = require('../common/constants/constants')
const Image = require('../models/image.model')
const cloudinary = require('../common/utils/cloudinary')

// access: private
const ImageController = {
  // POST /images/uploadImage
  create: async (req, res) => {
    // console.log('[CREATE IMAGE]:', req.file)
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'TDTU',
      })

      const image = await Image.create({
        link: result.url,
        cloudinaryId: result.public_id,
      })

      res.status(201).json(image)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },

  // POST /images/uploadImages
  createImages: async (req, res) => {
    // console.log('[CREATE IMAGES]:', req.files)
    try {
      const files = req.files

      const images = []

      for (const file of files) {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'TDTU',
        })

        const image = await Image.create({
          link: result.url,
          cloudinaryId: result.public_id,
        })

        images.push(image)
      }

      res.status(201).json(images)
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, status: Statuses.ERROR, code: 500 })
    }
  },
}

module.exports = ImageController
