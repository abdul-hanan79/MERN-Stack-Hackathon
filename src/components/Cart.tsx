'use client'
import useCart from '@/customHooks/useCart';
import useVerifyUserLogined from '@/customHooks/utils/useVerifyUserLogined';
import { addToCartItemType } from '@/types/types';
import React, { useEffect } from 'react';
import SimpleButton from './ui/SimpleButton';

const CartPage = () => {
    // Dummy data for cart items
    const { checkUserLogin } = useVerifyUserLogined()
    useEffect(() => {
        checkUserLogin()
        // doFetchCartItems()
    }, [])
    const { cartItems, doDeleteCartItem } = useCart()


    // Calculate the total price
    const totalPrice = cartItems.reduce(
        (total: any, item: any) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="flex justify-center mt-8">
            {/* Left side: Cart Items */}
            <div className="w-2/3 p-4 border-2 border-blue-500 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {cartItems.map((item: addToCartItemType) => (
                    <div key={item.id} className="mb-4">
                        <p className="text-lg">{item.productId}</p>
                        <p className="text-gray-600">${item.price} x {item.quantity}</p>
                        <div className='flex gap-20'>
                            <SimpleButton title="delete" onClick={() => {
                                doDeleteCartItem(item)
                            }} />
                            <SimpleButton title="Update Cart" onClick={() => {
                                doDeleteCartItem(item)
                            }} />
                        </div>

                    </div>
                ))}
            </div>

            {/* Right side: Cart Summary */}
            <div className="w-1/3 p-4 border-2 border-blue-500 rounded-lg shadow-lg ml-4">
                <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
                <div className="mb-4">
                    <p className="text-lg">Total Items: {cartItems.length}</p>
                    <p className="text-lg">Total Price: ${totalPrice.toFixed(2)}</p>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;
