import { addToCartItemType, productItemType } from '@/types/types'
// import React from 'react'
import { useUserLogined } from './utils/useUserLogined'
import { RootState } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteCartItem, fetchCartItems, updateCartItem } from '@/store/cartSlice'
import { stat } from 'fs'
import React, { useEffect, useState } from 'react';


const useCart = () => {
    const cartItems = useSelector((state: any) => state.cartSlice.cartItems)
    console.log("cart =====>", cartItems);
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const { loginUserDetails } = useUserLogined()
    const initialItemValues = cartItems || "hello";
    console.log("initial Item Values =====>", initialItemValues);
    const [items, setItems] = useState(initialItemValues);
    const [showOrder, setShowOrder] = useState(false)
    console.log("items =====>", items);
    useEffect(() => {
        setItems(cartItems);
        console.log("value of item in use effect =====>", items);
    }, [cartItems]);
    const handleFormSubmit = async (values: any, item: any) => {
        try {
            const itemId = item.id
            console.log("values in submit form", values);
            // Handle form submission for the specific item (e.g., update quantity in your cart)
            console.log(`Item ${itemId} updated with quantity: ${values.quantity}`);
            // You can update your cart state here, for example:
            const updatedItems = items.map((item: addToCartItemType) =>
                item.id === itemId ? { ...item, quantity: values.quantity } : item
            );
            const itemToUpdate = {
                ...item,
                quantity: values.quantity,
            }
            setItems(updatedItems);
            await doUpdateCartItem(itemToUpdate)
        } catch (error: any) {
            console.log("error in handle form submit", error.message);
        }
    };
    const doFetchCartItems = async (userId = loginUserDetails.id) => {
        try {
            // const userId = loginUserDetails.id
            console.log("user id in do fetch cart items");
            if (userId) {
                const action = await dispatch(fetchCartItems(userId))
                console.log("action", action);
            }
            else {
                console.log("user Id is not defined");
            }

        } catch (error: any) {
            console.log("error in fetch cart item", error.message);
        }
    }
    const doAddToCart = async (item: productItemType) => {
        try {
            const foundItemId = item.id
            console.log("found item id", foundItemId);
            const foundItem = cartItems.find((item: any) => item.productId == foundItemId)
            console.log("found item", foundItem);
            if (foundItem) {
                const updateItem = {
                    ...foundItem,
                    quantity: foundItem.quantity + 1
                }
                console.log("updated item", updateItem);
                await doUpdateCartItem(updateItem)
            }
            else {
                const addToCartItem: addToCartItemType = {
                    productId: item.id,
                    cartId: loginUserDetails.cartId,
                    quantity: 1,
                    price: item.price,
                }
                const action = await dispatch(addToCart(addToCartItem))
                console.log("addToCartItem in use cart", addToCartItem);
                console.log("addToCartItem action", action);
            }

        } catch (error: any) {
            console.log("error in doAddToCart", error.message);
        }


    }
    const doDeleteCartItem = async (item: addToCartItemType) => {
        try {
            const cartItemId = item.id;
            const action = await dispatch(deleteCartItem(cartItemId))
            console.log("action  in doDeleteCartitem", action);
            console.log("value after delete cart item", items);
            console.log("cart items in delted =====>", cartItems);
            // setItems(cartItems)
            console.log("value of item afeter delted =====>", items);
        }
        catch (error: any) {
            console.log("error in doDeleteCartItem", error.message);
        }
    }
    const doUpdateCartItem = async (item: addToCartItemType) => {
        try {
            console.log("hello");
            const action = await dispatch(updateCartItem(item))
            console.log("action ", action);
        } catch (error: any) {
            console.log("error in updatedCartItem", error.message);
        }
    }

    return {
        doAddToCart,
        cartItems,
        doFetchCartItems,
        doDeleteCartItem,
        doUpdateCartItem,
        items,
        setItems,
        handleFormSubmit, showOrder, setShowOrder
    }

}

export default useCart
