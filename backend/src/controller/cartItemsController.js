const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const doCreateCartItem = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const cartItem = {
            cartId: req.body.cartId,
            productId: req.body.productId,
            quantity: req.body.quantity
        }
        const uploadCartItem = await prisma.CartItem.create({
            data: cartItem,
        })
        console.log("uploadCartItem", uploadCartItem);
        res.json({
            data: uploadCartItem,
            message: "successfull"
        })
    }
    catch (error) {
        res.json({
            error: error,
            message: "unsuccessful"
        })
    }
    finally {
        await prisma.$disconnect()
    }
}
// const doUpdateRating = async (req, res) => {
//     try {
//         const ratingId = req.body.id
//         const updateUserRating = {
//             rating: req.body.rating,
//             reviews: req.body.reviews,
//         }
//         const updatedRating = await prisma.Ratings.update({
//             where: {
//                 id: ratingId,
//             },
//             data: updateUserRating
//         })
//         console.log("udpated user rating", updatedRating);
//         res.json({
//             data: "ok",
//             message: "successfull"
//         })
//     }
//     catch (error) {
//         res.json({
//             error: error,
//             message: "unsuccessful"
//         })
//     }
//     finally {
//         await prisma.$disconnect()
//     }
// }
const doDeleteCartItem = async (req, res) => {
    try {
        const ratingId = req.query.id
        await prisma.Ratings.delete({
            where: {
                id: ratingId,
            }
        })
        res.json({
            data: "ok",
            message: "successfull"
        })
    }
    catch (error) {
        res.json({
            error: error,
            message: "unsuccessful"
        })
    }
    finally {
        await prisma.$disconnect()
    }
}
const doGetCartItems = async (req, res) => {
    try {
        const allRatings = await prisma.Ratings.findManyk();
        res.json({
            data: allRatings,
            message: "successfull"
        })
    }
    catch (error) {
        res.json({
            error: error,
            message: "unsuccessful"
        })
    }
    finally {
        await prisma.$disconnect()
    }
}
module.exports = {
    doCreateCartItem,
    doDeleteCartItem,
    doGetCartItems
}