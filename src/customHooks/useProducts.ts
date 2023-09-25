import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { useRouter } from "next/navigation";
import { submitProduct } from '@/store/productSlice';
import { productType } from '@/types/types';
import { useUserLogined } from '@/customHooks/utils/userLogined';


const useProducts = () => {
    const router = useRouter();
    const { loginUserDetails } = useUserLogined()
    console.log("user id is", loginUserDetails.id);
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const uploadProductDetails = async (values: productType) => {
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
    return {
        uploadProductDetails
    }
}

export default useProducts
