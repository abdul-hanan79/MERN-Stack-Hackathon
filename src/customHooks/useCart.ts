import { addToCartItemType, productItemType } from '@/types/types'
import React from 'react'
import { useUserLogined } from './utils/userLogined'
import { RootState } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteCartItem, fetchCartItems } from '@/store/cartSlice'
import { stat } from 'fs'

const useCart = () => {
    const cartItems = useSelector((state: any) => state.cartSlice.cartItems)
    console.log("cart ", cartItems);
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const { loginUserDetails } = useUserLogined()
    const doFetchCartItems = async () => {
        try {
            const userId = loginUserDetails.id
            console.log("user id in do fetch cart items");
            const action = await dispatch(fetchCartItems(userId))
            console.log("action", action);
        } catch (error: any) {
            console.log("error in fetch cart item", error.message);
        }
    }
    const doAddToCart = async (item: productItemType) => {
        try {
            const addToCartItem: addToCartItemType = {
                productId: item.id,
                cartId: loginUserDetails.cartId,
                quantity: 1,
                price: item.price,
            }
            const action = await dispatch(addToCart(addToCartItem))
            console.log("addToCartItem in use cart", addToCartItem);

        } catch (error: any) {
            console.log("error in doAddToCart", error.message);
        }


    }
    const doDeleteCartItem = async (item: addToCartItemType) => {
        try {
            const cartItemId = item.id;
            const action = await dispatch(deleteCartItem(cartItemId))
            console.log("action  in doDeleteCartitem", action);
        }
        catch (error: any) {
            console.log("error in doDeleteCartItem", error.message);
        }
    }
    const doIncrementQuantity = async (item: addToCartItemType) => {
        try {

        } catch (error: any) {
            console.log("error in increment quantity", error.message);
        }
    }
    return {
        doAddToCart,
        cartItems,
        doFetchCartItems,
        doDeleteCartItem
    }

}

export default useCart
