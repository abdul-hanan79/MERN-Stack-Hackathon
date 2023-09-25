const { PrismaClient } = require('@prisma/client');
const { response } = require('express');
const prisma = new PrismaClient();
const doCreateCartItem = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const cartItem = {
            cartId: req.body.cartId,
            productId: req.body.productId,
            quantity: req.body.quantity
        }
        const uploadCartItem = await prisma.CartItems.create({
            data: cartItem
        })
        console.log("uploadCartItem", uploadCartItem);
        const response = {
            result: uploadCartItem,
            message: "successfull"
        }
        res.json(response)
    }
    catch (error) {
        const response = {
            error,
            message: "unsuccessful"
        }
        res.json(response)
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
        const cartItemId = req.query.id
        await prisma.CartItems.delete({
            where: {
                id: cartItemId,
            }
        })
        const response = {
            message: 'successfull'
        }
        res.json(response)
    }
    catch (error) {
        const response = {
            error,
            message: "unsuccessful"
        }
        res.json(response)
    }
    finally {
        await prisma.$disconnect()
    }
}
const doGetCartItems = async (req, res) => {
    try {
        const userId = req.body.userId;
        const userWithCart = await prisma.User.findUnique({
            where: {
                id: userId
            },
            include: {
                Cart: {
                    include: {
                        items: true
                    }
                }
            }
        })
        const response = {
            result: userWithCart,
            message: "successfull",
        }
        res.json(response)
    }
    catch (error) {
        const response = {
            error,
            message: "unsuccessful"
        }
        res.json(response)
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