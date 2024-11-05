const express = require('express')
const router = express.Router()
const ProductController = require('../app/controller/ProductController')

router.get('/', ProductController.getAllProducts)
router.get('/edit/:id', ProductController.getAProduct)
router.get('/productregistered', ProductController.getAllProductsRegistered)
router.post('/add', ProductController.postAProduct)
router.put('/edit/:id', ProductController.putAProduct)
router.delete('/edit/:id', ProductController.deleteAProduct)

module.exports = router