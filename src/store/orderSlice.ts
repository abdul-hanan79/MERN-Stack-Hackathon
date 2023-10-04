import { orderType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import ProductData from '../ProductData'
export const createOrder = createAsyncThunk('/order/createOrder', async (orderDetails: orderType) => {
    try {
        const order = orderDetails;
        const result = await axios.post("http://localhost:8080/order/createOrder", { order })
        console.log("result", result.data);
        const uploadedOrder = result.data;
        console.log("upload order", uploadedOrder);
        return uploadedOrder
    } catch (error: any) {
        console.log("error", error.message);
    }
})
export const fetchOrder = createAsyncThunk('/order/fetchOrder', async (userId: string) => {
    try {
        console.log("user Id in fetch order",userId);
        const result = await axios.get(`http://localhost:8080/order/getOrders?id=${userId}`);
        console.log("result in fetchOrder", result.data);
        const fetchedOrder = result.data;
        return fetchedOrder;
    } catch (error: any) {
        console.log("error in fetch cart items", error.message);
    }
})
export const deleteOrder = createAsyncThunk('/order/deleteOrder', async (orderId: string | undefined) => {
    try {
        const result = await axios.delete(`http://localhost:8080/order/deleteOrder?id=${orderId}`)
        console.log("result ", result.data);
        const deletedOrder = {
            message: result.data.message,
            orderId,
        }
        return deletedOrder
    } catch (error: any) {
        console.log("error in detelte cart item", error.message);
    }
})
// export const updateCartItem = createAsyncThunk('/cart/updateCartItem', async (item: addToCartItemType) => {
//     const updateItem = item;
//     const result = await axios.patch('http://localhost:8080/cartItem/updateCartItem', updateItem)
//     console.log("result", result.data);
//     const updatedCartItemDetails = {
//         message: result.data.message,
//         updatedItem: result.data.result
//     }
//     return updatedCartItemDetails
// })
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
                console.log("new state in create order", newState);
                return newState
            }
            else {
                return state
            }
        }),
            builder.addCase(fetchOrder.fulfilled, (state, action) => {
                console.log("action payload in fetch order", action.payload);
                console.log("order items", action.payload.result.Order,);
                if (action.payload.message == "successfull") {
                    let newState = {
                        ...state,
                        // cartDetail: action.payload.result,
                        orderDetails: action.payload.result.Order,
                    }
                    console.log("new state", newState);
                    return newState;
                }
                else {
                    return state;
                }
            })
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            console.log("action payload", action.payload);
            if (action.payload?.message == "successfull") {
                let allOrders = state.orderDetails
                let filteredOrders = allOrders.filter((item: any) => item.id !== action.payload?.orderId)
                let newState = {
                    ...state,
                    orderDetails: filteredOrders
                }
                console.log("new state after deleting order", newState);
                return newState
            }
            return state
        })
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