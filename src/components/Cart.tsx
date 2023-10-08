'use client'
import useCart from '@/customHooks/useCart';
import useVerifyUserLogined from '@/customHooks/utils/useVerifyUserLogined';
import { addToCartItemType } from '@/types/types';
import React, { useEffect, useState } from 'react';
import SimpleButton from './ui/SimpleButton';
import CartQuantityForm from './CartQuantityForm';
import OrderDetails from './OrderDetails';
import SingleProductDetail from './SingleProductDetail';

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
            <div className="flex justify-center mt-8 p-4">
                {/* Left side: Cart Items */}
                <div className="w-2/3 p-4 border-2 border-yellow-200 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                    {items.map((item: addToCartItemType) => (

                        <div key={item.id} className="mb-4  rounded-lg shadow-md border-2 border-yellow-200 p-3">
                            <SingleProductDetail item={item} />
                            {/* <p className="text-lg">{item.productId}</p> */}
                            <div className="text-gray-600 flex mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    {item.price}</span> x <span>{item.quantity}</span>
                            </div>
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
                <div className="w-1/3 p-4 border-2 border-teal-400 rounded-lg shadow-lg ml-4">
                    <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
                    <div className="mb-4">
                        <p className="text-lg">Total Items: {cartItems.length}</p>
                        <p className="text-lg">Total Price: ${totalPrice.toFixed(2)}</p>
                    </div>
                    <SimpleButton
                        title="Checkout"
                        onClick={() => {
                            setShowOrder(!showOrder)
                        }}
                    />

                </div>
            </div>
            {showOrder && <OrderDetails cartItems={items} totalPrice={totalPrice} />}
        </div>
    );
};

export default CartPage;
