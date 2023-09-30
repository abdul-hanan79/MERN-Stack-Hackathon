'use client'
import useOrder from '@/customHooks/useOrder'
import { orderType } from '@/types/types'
import React from 'react'

const Order = () => {
    const { order, doDeleteOrder } = useOrder()
    return (
        <div className="flex justify-center mt-8">
            <div className="w-2/3 p-4 border-2 border-blue-500 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {order.map((item: any, index: number) => (
                    <div key={index} className="mb-4">
                        <p className="text-lg">{item.status}</p>
                        <p className="text-gray-600">${item.totalPrice} </p>
                        <p className="text-gray-600">${item.shippingAddress}</p>
                        {
                            item?.map((orderItem: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <p>productId:{orderItem.productId}</p>
                                        <p>Quantity:{orderItem.quantity}</p>
                                    </div>

                                )
                            })
                        }


                        {/* <CartQuantityForm initialValues={item} onSubmit={(values: any) => handleFormSubmit(values, item)} />
                            <div className='flex gap-20'>
                                <SimpleButton title="delete" onClick={() => {
                                    doDeleteCartItem(item)
                                }} />
                            </div> */}

                    </div>
                ))}
            </div>
        </div>

    )
}

export default Order
