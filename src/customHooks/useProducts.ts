import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { useRouter } from "next/navigation";
import { deleteProduct, fetchProducts, submitProduct, updateProduct } from '@/store/productSlice';
import { productItemType, productType } from '@/types/types';
import { useUserLogined } from '@/customHooks/utils/useUserLogined';
import { useEffect, useState } from 'react';


const useProducts = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const allProducts = useSelector((state: any) => state.productSlice.products)
    console.log("allProducts", allProducts);
    const router = useRouter();
    const { loginUserDetails } = useUserLogined()
    console.log("user id is", loginUserDetails.id);
    const [products, setProducts] = useState(allProducts)
    console.log("products", products);
    const [loader, setLoader] = useState(false)
    console.log("loader initil value",loader);
    useEffect(() => {
        setProducts(allProducts)
    }, [allProducts])
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
            console.log("loader in fetch products  dofetch",loader);
        } catch (error: any) {
            console.log("error in fetchProducts", error.message);
        }
        finally {
            setLoader(false)
            console.log("loader in fetch products ",loader);

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
    const doUpdateProduct = async (values: any, product: productItemType[]) => {
        console.log("values in do update product", values);
        console.log("values in do item product", product);
        try {
            const updateProductDetails = {
                id: product[0].id,
                name: values.name,
                description: values.description,
                category: values.category,
                price: values.price,
                image: values.image,
                color: values.color,
                size: values.size,
                stock: values.stock,
                userId: product[0].userId
            }
            console.log("updated product details", updateProductDetails);
            const action: any = await dispatch(updateProduct(updateProductDetails))
            console.log("action in update product", action);
            if (action?.payload?.message == "successfull") {
                console.log("item is uploaded");
                router.push('/dashboard')
            }
        } catch (error: any) {
            console.log("error in update product details", error.message);
        }
        finally {
            setLoader(false)
        }
    }
    return {
        uploadProductDetails,
        doFecthProducts,
        doDeleteProduct,
        products,
        loader,
        setLoader,
        doUpdateProduct,
    }
}

export default useProducts
