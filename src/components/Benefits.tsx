'use client'
import useVerifyUserLogined from '@/customHooks/utils/useVerifyUserLogined'
import { useUserLogined } from '@/customHooks/utils/useUserLogined'
import React, { useEffect } from 'react'
import useOrder from '@/customHooks/useOrder'
import useCart from '@/customHooks/useCart'
import useProducts from '@/customHooks/useProducts'
import { useLogin } from '@/customHooks/useLogin'

const Benefits = (props: any) => {
    const { isUserLoggedIn,
        loginUserDetails,
        userRole, } = useUserLogined()
    const { doFecthProducts } = useProducts();
    const { doFetchCartItems } = useCart()
    const { doFetchOrders } = useOrder()
    const { doFetchCurrentUser } = useLogin()
    console.log("isUserLoggined", isUserLoggedIn);
    useEffect(() => {
        if (isUserLoggedIn) {
            console.log("this is running benefits");
            doFecthProducts()
            doFetchCartItems()
            doFetchOrders()
        }
        else {
            console.log("fetch current user");
            doFetchCurrentUser()
        }
    }, [])
    return (
        <div className="bg-white p-6 shadow-md rounded-lg">
            <div className="text-2xl mb-4">{props.title}</div>
            <p className="text-gray-600">
                {props.description}
                {/* We offer a wide range of high-quality fashion products from top brands. */}
            </p>
        </div>

    )
}

export default Benefits
