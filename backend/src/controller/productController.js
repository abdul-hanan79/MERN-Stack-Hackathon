const { type } = require("os");
const { UploadImage } = require("../utils/cloudinary")
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const doGetProducts = async (req, res) => {
    try {
        // const products = await prisma.User.findMany({
        //     include: {
        //         products: {
        //             include: {
        //                 ratings: true
        //             }
        //         }
        //     }
        // });
        const products = await prisma.Product.findMany({
            include: {
                ratings: true,
            }
        });
        console.log("products is", products)
        console.log('get post is running')
        res.json({ data: products })
    }
    catch (e) {
        res.json({
            error: e.message,
            message: "not getting data"
        })
    }
    finally {
        await prisma.$disconnect()
    }
}
const doCreateProduct = async (req, res) => {
    try {
        console.log("reqbody", req.body)
        console.log("req files", req.files)
        const file = req.files.image
        const imageDetails = await UploadImage(file.tempFilePath)
        console.log("image detail", imageDetails);
        console.log("req.body ", req.body);
        const productData = {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            color: req.body.color,
            size: req.body.size,
            image: imageDetails.secure_url,
            stock: req.body.stock,
            userId: req.body.userId,
        }
        console.log("data is ", productData)
        console.log("type of ", typeof (productData.price), typeof (productData.stock));
        const product = await prisma.Product.create({
            data: productData
        })
        console.log("this is working")
        console.log("product is", product)
        // console.log("req.cookies", req.cookies);
        // post.push(req.body);
        res.json({ data: product });
    }
    catch (error) {
        return res.json({
            error,
            message: 'Product Submission Failed'
        })
    }
    finally {

    }
}
const doDeleteProduct = async (req, res) => {
    const productId = req.query.id;
    console.log("product id", productId)
    try {

        const deletedProduct = await prisma.Product.delete({
            where: {
                id: productId
            }
        })
        // const products = await prisma.Product.findMany()
        res.json({
            data: deletedProduct,
            message: "product deleted successfullf"
        })
    }
    catch (error) {
        res.json({
            error: error.message,
            message: "not delte"
        })
    }
    finally {
        await prisma.$disconnect();
    }
}
const doUpdateProduct = async (req, res) => {
    try {
        const updateProductData = {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            color: req.body.color,
            size: req.body.size,
            image: req.body.image,
            stock: req.body.stock,
            userId: req.body.userId,
        }
        console.log("reqbody", updateProductData)
        const updatedProduct = await prisma.Product.update({
            where: {
                id: req.body.id
            },
            data: updateProductData
        })
        console.log("updatd product is ", updatedProduct)
        res.json({
            data: updatedProduct,
            message: "product updated"
        })
    }
    catch (error) {
        res.json({
            error: error,
            message: "update product failed"
        })
    }
    finally {
        await prisma.$disconnect();
    }
}
module.exports = { doGetProducts, doCreateProduct, doDeleteProduct, doUpdateProduct }


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