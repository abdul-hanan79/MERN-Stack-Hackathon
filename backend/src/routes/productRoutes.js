const express = require('express')
const { doGetProduct, doCreateProduct, doDeleteProduct, doUpdateProduct } = require('../controller/productController')
const routes = express.Router()
routes.get('/getProduct', doGetProduct)
routes.post('/createProduct', doCreateProduct)
routes.delete('/deleteProduct', doDeleteProduct)
routes.put('/updateProduct', doUpdateProduct)
module.exports = routes