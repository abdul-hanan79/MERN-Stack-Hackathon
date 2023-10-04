import React from 'react'
import { useUserLogined } from './utils/useUserLogined';
import { addToCartItemType, orderType } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { createOrder, deleteOrder, fetchOrder } from '@/store/orderSlice';
import { useState, useEffect } from 'react'
import useCart from './useCart';
const useOrder = () => {
    const { doFetchCartItems } = useCart()
    console.log("use order order=====>");
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const orderItems = useSelector((state: any) => state.orderSlice.orderDetails)
    console.log("order Items order=====>", orderItems);
    const [order, setOrder] = useState(orderItems)
    // const [userDetails, setUserDetails] = useState('')
    useEffect(() => {
        setOrder(orderItems)
    }, [orderItems])
    const { loginUserDetails } = useUserLogined()
    // useEffect(() => {
    //     setUserDetails(loginUserDetails)
    // }, [loginUserDetails])
    // console.log("user details order=====>",userDetails);
    console.log("login user details in useOrder order=====>", loginUserDetails);
    var userDetails = loginUserDetails
    console.log("global varialbe of user details useOrder", userDetails);
    const doCreateOrder = async (values: any, cartItems: any, totalPrice: number) => {
        console.log("items ", cartItems);
        console.log("values", values);
        const orderItems = cartItems?.map((item: addToCartItemType) => ({
            productId: item.productId,
            quantity: item.quantity
        }))
        console.log("order item", orderItems);
        try {
            const userId = loginUserDetails.id;
            const orderDetails: orderType = {
                userId,
                totalPrice,
                status: "start",
                shippingAddress: values.shippingAddress,
                items: orderItems,
            }
            console.log("my order is", orderDetails);
            const action = await dispatch(createOrder(orderDetails))
            console.log("action in create order", action);
            doFetchCartItems()
        }
        catch (error: any) {
            console.log("error in create order", error.message);
        }
    }
    const doDeleteOrder = async (itemId: any) => {
        try {
            const action = dispatch(deleteOrder(itemId))
            console.log("action in delte order", action);
        }
        catch (error: any) {
            console.log("error in delete order", error.message);
        }
    }

    const doFetchOrders = async (userId = loginUserDetails.id) => {
        try {
            // console.log("user detail in fetch order order=====>", userDetails);
            // const userId = userDetails.id
            console.log("user id in do fetch order order=====>", userId);
            if (userId) {
                const action = await dispatch(fetchOrder(userId))
                console.log("action", action);
            }
            else {
                console.log("user id is undefined order=====>");
            }
        } catch (error: any) {
            console.log("error in fetch order order=====>", error.message);
        }
    }
    return {
        doCreateOrder,
        order,
        doDeleteOrder,
        doFetchOrders,
    }
}

export default useOrder
