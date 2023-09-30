import React from 'react'
import { useRouter } from "next/navigation";
import { useUserLogined } from './userLogined';
import useProducts from '../useProducts';
import useCart from '../useCart';
import useOrder from '../useOrder';

const useVerifyUserLogined = () => {
    const { isUserLoggedIn } = useUserLogined();
    const { doFecthProducts } = useProducts();
    const { doFetchCartItems } = useCart()
    const { doFetchOrder } = useOrder()
    const router = useRouter();
    const checkUserLogin = () => {
        if (isUserLoggedIn) {
            console.log("user is logined verify user logiend");
            doFecthProducts()
            doFetchCartItems()
            doFetchOrder()
        }
        else {
            router.push('/login')
        }
    }
    return {
        checkUserLogin,
    }
}

export default useVerifyUserLogined
