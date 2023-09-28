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
export const fetchCartItems = createAsyncThunk('/cart/fetchCartItems', async (userId: string) => {
    try {
        const result = await axios.get(`http://localhost:8080/cartItem/getCartItems?id=${userId}`);
        console.log("result in fetchCartItems", result.data);
        const cartItems = result.data;
        return cartItems;
    } catch (error: any) {
        console.log("error in fetch cart items", error.message);
    }
})
const initialState = {
    cartItems: [],
    cartDetail: {},
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
                    cartItems: [...state.cartItems, cartItem]
                }
                return newState
            }
            else {
                return state
            }
        }),
            builder.addCase(fetchCartItems.fulfilled, (state, action) => {
                console.log("action payload in fetchCartItems", action.payload);
                console.log("cart items",action.payload.result.items,);
                if (action.payload.message == "successfull") {
                    let newState = {
                        ...state,
                        cartDetail: action.payload.result[0],
                        cartItems: action.payload.result[0].items,
                    }
                    console.log("new state", newState);
                    return newState;
                }
                else {
                    return state;
                }
            })
    }
})
// export const { addToCart, getCartTotal, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer