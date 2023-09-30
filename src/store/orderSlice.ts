import { addToCartItemType, orderType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import ProductData from '../ProductData'
export const createOrder = createAsyncThunk('/order/createOrder', async (orderDetails: orderType) => {
    try {
        const order = orderDetails;
        const result = await axios.post("http://localhost:8080/order/createOrder", { order })
        console.log("result", result.data);
        const uploadedOrder = result.data;
        console.log("upload cart item", uploadedOrder);
        return uploadedOrder
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
export const deleteCartItem = createAsyncThunk('/cart/deleteCartItem', async (cartItemId: string | undefined) => {
    try {
        const result = await axios.delete(`http://localhost:8080/cartItem/deleteCartItem?id=${cartItemId}`)
        console.log("result ", result.data);
        const deletedCartItem = {
            message: result.data.message,
            cartItemId,
        }
        return deletedCartItem
    } catch (error: any) {
        console.log("error in detelte cart item", error.message);
    }
})
export const updateCartItem = createAsyncThunk('/cart/updateCartItem', async (item: addToCartItemType) => {
    const updateItem = item;
    const result = await axios.patch('http://localhost:8080/cartItem/updateCartItem', updateItem)
    console.log("result", result.data);
    const updatedCartItemDetails = {
        message: result.data.message,
        updatedItem: result.data.result
    }
    return updatedCartItemDetails
})
const initialState = {
    // orderItems: [],
    orderDetails: [],
    // totalQuantity: 0,
    // totalPrice: 0,
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.fulfilled, (state, action) => {
            console.log("action payload", action.payload);
            if (action.payload.message == "successfull") {
                const orderItem = action.payload.result;
                let newState: any = {
                    ...state,
                    orderDetails: [...state.orderDetails, orderItem]
                }
                console.log("new state", newState);
                return newState
            }
            else {
                return state
            }
        }),
            builder.addCase(fetchCartItems.fulfilled, (state, action) => {
                console.log("action payload in fetchCartItems", action.payload);
                console.log("cart items", action.payload.result.items,);
                if (action.payload.message == "successfull") {
                    let newState = {
                        ...state,
                        cartDetail: action.payload.result,
                        cartItems: action.payload.result.items,
                    }
                    console.log("new state", newState);
                    return newState;
                }
                else {
                    return state;
                }
            })
        //     builder.addCase(deleteCartItem.fulfilled, (state, action) => {
        //         console.log("action payload", action.payload);
        //         if (action.payload?.message == "successfull") {
        //             let allCartItems = state.cartItems
        //             let filteredCartitems = allCartItems.filter((item: any) => item.id !== action.payload?.cartItemId)
        //             let newState = {
        //                 ...state,
        //                 cartItems: filteredCartitems
        //             }
        //             return newState
        //         }
        //         return state
        //     })
        // builder.addCase(updateCartItem.fulfilled, (state, action) => {
        //     console.log("action is payload");
        //     if (action.payload.message == "successfull") {
        //         let updatedCartItem = action.payload.updatedItem
        //         let allCartItems = state.cartItems;
        //         let updatedCartItems = allCartItems.map((item: any) =>
        //             item.id === updatedCartItem.id ? { ...item, quantity: updatedCartItem.quantity } : item
        //         )
        //         console.log("updatedCartItem", updatedCartItems);
        //         let newState: any = {
        //             ...state,
        //             cartItems: updatedCartItems
        //         }
        //         console.log("updaetd state is ", newState);
        //         return newState
        //     }
        //     return state
        // })

    }
})
// export const { addToCart, getCartTotal, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default orderSlice.reducer