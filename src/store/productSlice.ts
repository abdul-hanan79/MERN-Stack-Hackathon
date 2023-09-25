import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";

import axios from "axios";
import { productType } from "@/types/types";

const axiosWithCookies = axios.create({
    withCredentials: true,
});
export const fetchProducts = createAsyncThunk(('product/fetchProducts'), async () => {
    const allProducts = await axios.get("http://localhost:8080/products/getProducts")
    console.log("all products", allProducts)
    return allProducts
})
export const submitProduct = createAsyncThunk(('product/submitProduct'), async (productDetails: productType) => {
    try {
        const formData = new FormData();
        formData.append("name", productDetails.name)
        formData.append("category", productDetails.category)
        formData.append("color", productDetails.color)
        formData.append("description", productDetails.description)
        formData.append("image", productDetails.image)
        formData.append("price", productDetails.price.toString())
        formData.append("size", productDetails.size.toString())
        formData.append("stock", productDetails.stock.toString())
        formData.append("userId", productDetails.userId)
        console.log("form data", formData)
        const product = await axiosWithCookies.post("http://localhost:8080/products/createProduct", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
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
