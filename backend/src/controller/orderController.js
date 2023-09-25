const { PrismaClient } = require('@prisma/client');
const { clearCart } = require('../utils/clearCart');
const prisma = new PrismaClient();
const doCreateOrder = async (req, res) => {
    try {
        console.log("order", req.body.order);
        const userId = req.body.order.userId
        const orderItems = req.body.order.items.map((item) => {
            const orderItemsDetails = {
                productId: item.productId,
                quantity: item.quantity
            }
            return orderItemsDetails
        })
        const orderDetails = {
            userId: userId,
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
        const clearCartItems = await clearCart(userId)
        console.log("clearCartItems", clearCartItems);
        console.log("upload order", uploadOrder);
        const response = {
            result: uploadOrder,
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
        const response = {
            message: "successfull"
        }
        res.json(response)
    }
    catch (error) {
        const response = {
            error,
            message: "unsuccessful",
        }
        res.json(response)
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
        const response = {
            result: userWithCart,
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
module.exports = {
    doCreateOrder,
    doDeleteOrder,
    doGetOrders,
}