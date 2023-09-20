// var post = []

const { UploadImage } = require("../utils/cloudinary")


const doGetProduct = (req, res) => {
    console.log('get post is running')
    res.json({ data: post })
}
const doCreateProduct = async (req, res) => {
    try {
        console.log("reqbody", req.body)
        const imageDetails = await UploadImage(req.body.image)
        console.log("image detail", imageDetails);
        // console.log("req", req);
        console.log("req.body ", req.body);
        // console.log("req.cookies", req.cookies);
        // post.push(req.body);
        res.json({ data: "hello" });
    }
    catch (error) {
        return res.json({
            error: error,
            message: 'Product Submission Failed'
        })
    }
    finally {

    }
}
const doDeleteProduct = (req, res) => {
    const updatePost = post.filter(post => post.id != req.query.id)
    post = updatePost
    res.json({ updatdPost: post })
}
const doUpdateProduct = (req, res) => {
    const updatedPost = post.map((post) => {
        if (post.id == req.body.id) {
            const update = {
                ...post,
                creator: req.body.creator || post.creator,
                postTitle: req.body.postTitle,

            }
            console.log(update)
            return update
        }
        else {
            return post
        }
    })
    post = updatedPost
    res.json({ data: post })
}

module.exports = { doGetProduct, doCreateProduct, doDeleteProduct, doUpdateProduct }