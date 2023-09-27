import { addToCartItemType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import ProductData from '../ProductData'
export const addToCart = createAsyncThunk('/cart/addToCart', async (item: addToCartItemType) => {
    try {
        const addToCartItem = item;
        const result = await axios.post("http://localhost:8080/cartItem/createCartItem", addToCartItem)
        console.log("result", result.data);
        const uploadedCartItem = result.data;
        console.log("upload cart item", uploadedCartItem);
        return uploadedCartItem
    } catch (error: any) {
        console.log("error", error.message);
    }
})
const initialState = {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            console.log("action payload", action.payload);
            if (action.payload.message == "successfull") {
                const cartItem = action.payload.result;
                let newState: any = {
                    ...state,
                    cart: [...state.cart, cartItem]
                }
                return newState

            }
            else {
                return state
            }
        })
    }
})
// export const { addToCart, getCartTotal, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer