import React from 'react'
import { useRouter } from "next/navigation";
import { useUserLogined } from './userLogined';
import useProducts from '../useProducts';
import useCart from '../useCart';

const useVerifyUserLogined = () => {
    const { isUserLoggedIn } = useUserLogined();
    const { doFecthProducts } = useProducts();
    const { doFetchCartItems } = useCart()
    const router = useRouter();
    const checkUserLogin = () => {
        if (isUserLoggedIn) {
            console.log("user is logined verify user logiend");
            doFecthProducts()
            doFetchCartItems()
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
