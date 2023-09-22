const express = require('express')
const routes = express.Router()
const {
    doGetRatings,
    doCreateRating,
    doDeleteRating,
    doUpdateRating
} = require('../controller/ratingController')
routes.get('/getRatings', doGetRatings)
routes.post('/createRating', doCreateRating)
routes.delete('/deleteRating', doDeleteRating)
routes.patch('/updateRating', doUpdateRating)
module.exports = routes