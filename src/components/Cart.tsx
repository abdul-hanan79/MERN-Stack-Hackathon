'use client'
import useCart from '@/customHooks/useCart';
import useVerifyUserLogined from '@/customHooks/utils/useVerifyUserLogined';
import { addToCartItemType } from '@/types/types';
import React, { useEffect, useState } from 'react';
import SimpleButton from './ui/SimpleButton';
import CartQuantityForm from './CartQuantityForm';
import OrderDetails from './OrderDetails';

const CartPage = () => {
    const { checkUserLogin } = useVerifyUserLogined()
    const { cartItems, doDeleteCartItem, items,
        handleFormSubmit, setItems, showOrder, setShowOrder } = useCart()
    useEffect(() => {
        checkUserLogin()
    }, [])
    // Calculate the total price
    const totalPrice = items.reduce(
        (total: any, item: any) => total + item.price * item.quantity,
        0
    );
    console.log("items in cart tsx =====>", items);
    return (
        <div>
            <div className="flex justify-center mt-8">
                {/* Left side: Cart Items */}
                <div className="w-2/3 p-4 border-2 border-blue-500 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                    {items.map((item: addToCartItemType) => (
                        <div key={item.id} className="mb-4">
                            <p className="text-lg">{item.productId}</p>
                            <p className="text-gray-600">${item.price} x {item.quantity}</p>
                            <CartQuantityForm initialValues={item} onSubmit={(values: any) => handleFormSubmit(values, item)} />
                            <div className='flex gap-20'>
                                <SimpleButton title="delete" onClick={() => {
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
                        onClick={() => {
                            setShowOrder(!showOrder)
                        }}
                    >
                        Checkout
                    </button>
                </div>
            </div>
            {showOrder && <OrderDetails cartItems={items} totalPrice={totalPrice} />}
        </div>
    );
};

export default CartPage;
