const express = require('express')
const { doGetProducts, doCreateProduct, doDeleteProduct, doUpdateProduct } = require('../controller/productController')
const { verifyUser } = require('../utils/verifyUser')
const routes = express.Router()
routes.get('/getProducts', doGetProducts)
routes.post('/createProduct', doCreateProduct)
routes.delete('/deleteProduct',verifyUser, doDeleteProduct)
routes.put('/updateProduct', doUpdateProduct)
module.exports = routes