import { addToCartItemType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import ProductData from '../ProductData'
export const addToCart = createAsyncThunk('/cart/addToCart', async (item: addToCartItemType) => {
    try {
        const addToCartItem = item;
        const result = await axios.post("http://localhost:8080/cartItem/createCartItem", { addToCartItem })
        console.log("result", result.data);
        const uploadedCartItem = result.data;
        return uploadedCartItem

    } catch (error: any) {
        console.log("error", error.message);
    }
})
const initialState = {
    cart: [],
    // items: ProductData,
    totalQuantity: 0,
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        //     addToCart: (state, action) => {
        //         let find = state.cart.findIndex((item) => item.id === action.payload.id)
        //         console.log("find", find);
        //         if (find >= 0) {
        //             state.cart[find].quantity += 1
        //         }
        //         else {
        //             state.cart.push(action.payload)
        //         }
        //         // state.cart = state.cart.map((item) => {
        //         //     console.log("item.quantity in increement", item.totalPrice);
        //         //     if (item.id == action.payload.id) {

        //         //         return { ...item, totalPrice: item.price * item.quantity }
        //         //     }

        //         //     return item
        //         // })

        //     },
        //     getCartTotal: (state) => {
        //         let { totalQuantity, totalPrice } = state.cart.reduce(
        //             (cartTotal, cartItem) => {
        //                 console.log("cart Total", cartTotal);
        //                 console.log("cart Item", cartItem);
        //                 const { price, quantity } = cartItem;
        //                 console.log(price, quantity);
        //                 const itemTotal = price * quantity;
        //                 cartTotal.totalPrice += itemTotal;
        //                 cartTotal.totalQuantity += quantity;
        //                 return cartTotal;
        //             },
        //             {
        //                 totalPrice: 0,
        //                 totalQuantity: 0,
        //             }
        //         );
        //         state.totalPrice = parseInt(totalPrice.toFixed(2));
        //         state.totalQuantity = totalQuantity;

        //     },

        //     removeItem: (state, action) => {
        //         state.cart = state.cart.filter((item) => item.id != action.payload.id)
        //     },
        //     increaseQuantity: (state, action) => {
        //         console.log("increase Quantity is running")
        //         state.cart = state.cart.map((item) => {
        //             console.log("item.quantity in increement", item.quantity);
        //             if (item.id == action.payload.id) {

        //                 return { ...item, quantity: item.quantity + 1 }
        //             }

        //             return item
        //         })
        //         state.cart = state.cart.map((item) => {
        //             console.log("item.quantity in increement", item.totalPrice);
        //             if (item.id == action.payload.id) {

        //                 return { ...item, totalPrice: item.price * item.quantity }
        //             }

        //             return item
        //         })

        // state.totalPrice = state.cart.map((item) => {
        //     if (item.id = action.payload.id) {
        //         return { price: item.price * item.quantity }
        //     }
        // })
        //     },
        //     decreaseQuantity: (state, action) => {
        //         state.cart = state.cart.map((item) => {
        //             // console.log("item.quantity in decrement", item.quantity);
        //             if (item.id == action.payload.id) {
        //                 return { ...item, quantity: item.quantity - 1 }
        //             }
        //             return item
        //         })
        //         state.cart = state.cart.map((item) => {
        //             // console.log("item.quantity in increement", item.totalPrice);
        //             if (item.id == action.payload.id) {

        //                 if (item.quantity > 0) {
        //                     return { ...item, totalPrice: item.price * item.quantity }
        //                 }
        //                 else {
        //                     return { ...item, quantity: 1 }
        //                 }
        //             }

        //             return item
        //         })



        //     }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            console.log("action payload", action.payload);
        })
    }
})
// export const { addToCart, getCartTotal, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer