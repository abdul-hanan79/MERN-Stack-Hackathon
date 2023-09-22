const express = require('express')
const { doGetProducts, doCreateProduct, doDeleteProduct, doUpdateProduct } = require('../controller/productController')
const routes = express.Router()
routes.get('/getProducts', doGetProducts)
routes.post('/createProduct', doCreateProduct)
routes.delete('/deleteProduct', doDeleteProduct)
routes.put('/updateProduct', doUpdateProduct)
module.exports = routes