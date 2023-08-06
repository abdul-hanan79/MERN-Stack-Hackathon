const express = require('express')
const { doGetPost, doCreatePost, doDeletePost, doUpdatePost } = require('../controller/postController')
const routes = express.Router()


routes.get('/getPost', doGetPost)
routes.post('/createPost', doCreatePost)
routes.delete('/deletePost', doDeletePost)
routes.put('/updatePost', doUpdatePost)
module.exports = routes