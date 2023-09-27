import { addToCartItemType, productItemType } from '@/types/types'
import React from 'react'
import { useUserLogined } from './utils/userLogined'
import { RootState } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/store/cartSlice'

const useCart = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const { loginUserDetails } = useUserLogined()
    const doAddToCart = async (item: productItemType) => {
        try {
            const addToCartItem: addToCartItemType = {
                productId: item.id,
                cartId: loginUserDetails.cartId,
                quantity: 1
            }
            const action = await dispatch(addToCart(addToCartItem))
            console.log("addToCartItem", addToCartItem);

        } catch (error: any) {
            console.log("error in doAddToCart", error.message);
        }


    }
    return {
        doAddToCart
    }

}

export default useCart
