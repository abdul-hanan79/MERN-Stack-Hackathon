import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";

import axios from "axios";
import { productType } from "@/types/types";

const axiosWithCookies = axios.create({
    withCredentials: true,
});

export const submitProduct = createAsyncThunk(('product/submitProduct'), async (productDetails: productType) => {
    try {
        console.log("prodcut details", productDetails);
        const product = await axiosWithCookies.post("http://localhost:8080/products/createProduct", { productDetails })
        console.log("uploaded product", product)
        const productDetail = product.data;
        console.log("product data is", productDetail);
        return productDetail
    }
    catch (e) {
        console.log("error in submitProduct", e);
    }
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        error: null,
        // product: {},
        products: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(submitProduct.fulfilled, (state, action) => {
            console.log("prodcut details in extraReducers", action.payload);
            let newState: any = {
                ...state,
                product: [...state.products, action.payload],
            }
        })
    }

})
export default productSlice.reducer
