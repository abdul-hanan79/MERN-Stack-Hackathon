// var post = []

const { UploadImage } = require("../utils/cloudinary")


const doGetProduct = (req, res) => {
    console.log('get post is running')
    res.json({ data: post })
}
const doCreateProduct = async (req, res) => {
    try {
        console.log("reqbody", req.body)
        console.log("req files", req.files)
        const file = req.files.image
        const imageDetails = await UploadImage(file.tempFilePath)
        console.log("image detail", imageDetails);
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


// image detail {
//     asset_id: '5f8a1076ec1e2c2376c61e14e3932c73',
//     public_id: 'car-rental-mobile/y6vohnvpayytizevhexw',
//     version: 1695206121,
//     version_id: 'ce3f9d7e877ec4a5b3280a44e9f1137d',
//     signature: '8a73f4e0e626c479b39b5f6b51669cd8bb97c8d6',
//     width: 626,
//     height: 760,
//     format: 'jpg',
//     resource_type: 'image',
//     created_at: '2023-09-20T10:35:21Z',
//     tags: [],
//     bytes: 41042,
//     type: 'upload',
//     etag: '03e8775d6a268501d23e645fc471d7d1',
//     placeholder: false,
//     url: 'http://res.cloudinary.com/dgzlbh9uw/image/upload/v1695206121/car-rental-mobile/y6vohnvpayytizevhexw.jpg',
//     secure_url: 'https://res.cloudinary.com/dgzlbh9uw/image/upload/v1695206121/car-rental-mobile/y6vohnvpayytizevhexw.jpg',
//     folder: 'car-rental-mobile',
//     original_filename: 'tmp-1-1695206119100',
//     api_key: '727815111467615'
//   }