const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const clearCart = async (userId) => {
    console.log("user id in clear cart", userId);
    try {
        const Cart = await prisma.Cart.findMany({
            where: {
                userId
            }
        })
        console.log("Cart ", Cart)
        const cartId = Cart.id
        const DeleteCartItems = await prisma.cartItems.deleteMany({
            where: {
                cartId
            }
        })
        return "clear"
    }
    catch (error) {
        console.log(error.message)
        return "not clear"
    }
}
module.exports = { clearCart }