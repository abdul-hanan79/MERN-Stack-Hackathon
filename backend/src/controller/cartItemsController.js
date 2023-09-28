const { PrismaClient } = require('@prisma/client');
const { response } = require('express');
const prisma = new PrismaClient();
const doCreateCartItem = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const cartItem = {
            cartId: req.body.cartId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            price: req.body.price,
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
        console.log("error in create item", error.message);
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
        const userId = req.query.id;
        console.log("user id", userId);
        const cart = await prisma.Cart.findFirst({
            where: {
                userId: userId
            },
            include: {
                items: true
            }
        })
        console.log("user with cart", cart);
        const response = {
            result: cart,
            message: "successfull",
        }
        res.json(response)
    }
    catch (error) {
        console.log("error", error.message);
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
const doUpdateCartitem = async (req, res) => {
    try {
        const updateCartitemDetails = {
            cartId: req.body.cartId,
            productId: req.body.productId,
            price: req.body.price,
            quantity: req.body.quantity
        }
        console.log("updatedCart Items", updateCartitemDetails, "id", req.body.id);
        const updatedCartItem = await prisma.CartItems.update({
            where: {
                id: req.body.id,
            },
            data: updateCartitemDetails
        })
        // const updatedCartItem = await prisma.cartItems.findUnique({
        //     where: {
        //         id: req.body.id
        //     }
        // })
        console.log("found", updatedCartItem);
        const response = {
            result: updatedCartItem,
            message: "successfull"
        }
        res.json(response)
    } catch (error) {
        console.log("error in doUpdateCartitem", error.message);
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
    doGetCartItems,
    doUpdateCartitem
}