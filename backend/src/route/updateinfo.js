require('dotenv').config()

const express = require('express')
const router = express.Router()
const updateInfo = require('../app/controller/UpdateInfoController.js')

router.get('/cart/:id', updateInfo.getCart)
router.post('/addproducts', updateInfo.addProducts)
router.put('/info', updateInfo.updateInfo)
router.put('/password', updateInfo.updatePassword)
router.delete('/deleteproducts/:userId/:id', updateInfo.deleteProducts)

module.exports = router