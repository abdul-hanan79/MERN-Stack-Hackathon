import { addToCartItemType, productItemType } from '@/types/types'
import React from 'react'
import { useUserLogined } from './utils/userLogined'
import { RootState } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/store/cartSlice'
import { stat } from 'fs'

const useCart = () => {
    const cart = useSelector((state: any) => state.cartSlice.cart)
    console.log("cart ", cart);
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const { loginUserDetails } = useUserLogined()
    const doFetchCartItems = async () => {
        try {
            const action = await dispatch(fetchCartItems(loginUserDetails.id))
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
                quantity: 1
            }
            const action = await dispatch(addToCart(addToCartItem))
            console.log("addToCartItem in use cart", addToCartItem);

        } catch (error: any) {
            console.log("error in doAddToCart", error.message);
        }


    }
    return {
        doAddToCart,
        cart,

    }

}

export default useCart
