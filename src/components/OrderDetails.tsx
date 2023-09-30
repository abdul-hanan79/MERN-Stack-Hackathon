// pages/order.js
import React from 'react';
import OrderDetailsForm from './OrderDetailsForm';
import { addToCartItemType } from '@/types/types';
import useOrder from '@/customHooks/useOrder';
// import OrderForm from '../components/OrderForm';

const OrderDetails = (props: any) => {
    const { cartItems, totalPrice } = props
    const { doCreateOrder } = useOrder()
    // const handleOrderSubmit = (values: any, items: any) => {
    //     // Handle order submission logic here
    //     console.log('Order submitted with shipping address:', values.shippingAddress);
    // };
    return (
        <div className="container mx-auto py-8">
            <div className="flex space-x-4">
                <div className="w-3/4">
                    {cartItems?.map((item: addToCartItemType) => (
                        <div key={item.id} className="mb-4">
                            <p className="text-lg">{item.productId}</p>
                            <p className="text-gray-600">${item.price} x {item.quantity}</p>
                        </div>
                    ))}
                    <p>sub total : {totalPrice}</p>
                </div>
                <div className="w-1/4">
                    <OrderDetailsForm onSubmit={(values: any) => doCreateOrder(values, cartItems, totalPrice)} />
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

