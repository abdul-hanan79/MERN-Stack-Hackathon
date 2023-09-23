const express = require('express')
const routes = express.Router()
const { doCreateCartItem, doGetCartItems, doDeleteCartItem } = require('../controller/cartItemsController')
routes.get('/getCartItems', doGetCartItems)
routes.post('/createCartItem', doCreateCartItem)
routes.delete('/deleteCartItem', doDeleteCartItem)
// routes.patch('/updateRating', doUpdateRating)
module.exports = routes
