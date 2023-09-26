import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { useRouter } from "next/navigation";
import { deleteProduct, fetchProducts, submitProduct } from '@/store/productSlice';
import { productItemType, productType } from '@/types/types';
import { useUserLogined } from '@/customHooks/utils/userLogined';
import { useState } from 'react';


const useProducts = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const [loader, setLoader] = useState(false)
    const allProducts = useSelector((state: any) => state.productSlice.products)
    console.log("allProducts", allProducts);
    const router = useRouter();
    const { loginUserDetails } = useUserLogined()
    console.log("user id is", loginUserDetails.id);
    const uploadProductDetails = async (values: productType) => {
        try {
            const productDetails: productType = {
                name: values.name,
                description: values.description,
                category: values.category,
                price: values.price,
                image: values.image,
                color: values.color,
                size: values.size,
                stock: values.stock,
                userId: loginUserDetails.id
            }
            console.log("product with user", productDetails);
            const action = await dispatch(submitProduct(productDetails))
            console.log("values", values);

        }
        catch (e: any) {
            console.log("error in upload products", e.message);
        }
        finally {

        }
    }
    const doFecthProducts = async () => {
        try {
            setLoader(true)
            const action = await dispatch(fetchProducts());
            console.log("action", action);
        } catch (error: any) {
            console.log("error in fetchProducts", error.message);
        }
        finally {
            setLoader(false)
        }
    }
    const doDeleteProduct = async (item: productItemType) => {
        try {
            const productId = item.id;
            console.log("productId", productId);
            const action = await dispatch(deleteProduct(productId))
            console.log("action", action);
        } catch (error: any) {
            console.log("error in do delete product", error.message);
        }
        finally {
        }
    }
    return {
        uploadProductDetails,
        doFecthProducts,
        doDeleteProduct,
        allProducts,
        loader,
    }
}

export default useProducts
