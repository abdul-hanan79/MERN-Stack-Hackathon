import React from 'react'
import { useUserLogined } from './utils/userLogined';
import { addToCartItemType, orderType } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { createOrder, fetchCartItems } from '@/store/orderSlice';
import { useState, useEffect } from 'react'
import useCart from './useCart';
const useOrder = () => {
    const { doFetchCartItems } = useCart()
    console.log("use order");
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const orderItems = useSelector((state: any) => state.orderSlice.orderDetails)
    console.log("order Items", orderItems);
    const [order, setOrder] = useState(orderItems)
    useEffect(() => {
        setOrder(orderItems)
    }, [orderItems])
    const { loginUserDetails } = useUserLogined()
    const doCreateOrder = async (values: any, cartItems: any, totalPrice: number) => {
        console.log("items", cartItems);
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
    const doDeleteOrder = async () => {
        try {

        }
        catch (error: any) {
            console.log("error in delete order", error.message);
        }
    }
    const doFetchOrders = async () => {
        try {

        }
        catch (error: any) {
            console.log("error in delete order", error.message);
        }
    }
    const doFetchOrder = async () => {
        try {
            const userId = loginUserDetails.id
            console.log("user id in do fetch order");
            // const action = await dispatch(fetchOrder(userId))
            // console.log("action", action);
        } catch (error) {

        }
    }
    return {
        doCreateOrder,
        order,
        doDeleteOrder,
        doFetchOrder,
    }
}

export default useOrder
