const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const doCreateOrder = async (req, res) => {
    try {
        console.log("order", req.body.order);
        const orderItems = req.body.order.items.map((item) => {
            const orderItemsDetails = {
                productId: item.productId,
                quantity: item.quantity
            }
            return orderItemsDetails
        })
        const orderDetails = {
            userId: req.body.order.userId,
            totalPrice: req.body.order.totalPrice,
            status: req.body.order.status,
            shippingAddress: req.body.order.shippingAddress,
        }
        console.log("orderItems", orderItems);
        const uploadOrder = await prisma.Order.create({
            data: {
                ...orderDetails, // Spread the orderDetails here
                items: {
                    create: orderItems, // Correctly nest orderItems within the "create" property
                },
            },
        });
        console.log("upload order", uploadOrder);

        res.json({
            data: uploadOrder,
            message: "successfull"
        })
    }
    catch (error) {
        res.json({
            error: error.message,
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
const doDeleteOrder = async (req, res) => {
    try {
        const orderId = req.query.id
        console.log("order id", orderId)
        await prisma.OrderItem.deleteMany({
            where: {
                orderId
            },
        })
        await prisma.Order.delete({
            where: {
                id: orderId,
            }
        })
        res.json({
            data: "ok",
            message: "successfull"
        })
    }
    catch (error) {
        res.json({
            error: error.message,
            message: "unsuccessful"
        })
    }
    finally {
        await prisma.$disconnect()
    }
}
const doGetOrders = async (req, res) => {
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
        res.json({
            data: userWithCart,
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
    doCreateOrder,
    doDeleteOrder,
    doGetOrders,
}