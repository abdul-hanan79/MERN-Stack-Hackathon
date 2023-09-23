const express = require('express')
const { doCreateOrder,
    doDeleteOrder,
    doGetOrders, } = require('../controller/orderController')
const routes = express.Router()
routes.get('/getOrders', doGetOrders)
routes.post('/createOrder', doCreateOrder)
routes.delete('/deleteOrder', doDeleteOrder)
// routes.put('/updateProduct', doUpdateProduct)
module.exports = routes