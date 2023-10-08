'use client'
import useOrder from '@/customHooks/useOrder'
import { orderType } from '@/types/types'
import React, { useEffect } from 'react'
import SimpleButton from './ui/SimpleButton'
import useVerifyUserLogined from '@/customHooks/utils/useVerifyUserLogined'
import SingleProductDetail from './SingleProductDetail'

const Order = () => {
    const { order, doDeleteOrder } = useOrder()
    const { checkUserLogin } = useVerifyUserLogined()

    useEffect(() => {
        checkUserLogin()
    }, [])

    
    return (
        <div className="flex justify-center mt-8">
            <div className="w-2/3 p-4 border-2 border-blue-500 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Your Order {order.length}</h1>
                {order?.map((item: any, index: number) => (
                    <div key={index} className="mb-4">
                        <p className="text-lg">{item?.status}</p>
                        <p className="text-gray-600">${item.totalPrice} </p>
                        <p className="text-gray-600">${item.shippingAddress}</p>
                        {
                            item.items?.map((orderItem: any, index: any) => {
                                return (
                                    <div key={index}>
                                        {/* <p>productId:{orderItem.productId}</p> */}
                                        <SingleProductDetail item={orderItem}/>
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
                        <SimpleButton title="delete Order" onClick={() => {
                            doDeleteOrder(item.id)
                        }} />
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Order
