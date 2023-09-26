import React from 'react'
import { useRouter } from "next/navigation";
import { useUserLogined } from './userLogined';
import useProducts from '../useProducts';

const useVerifyUserLogined = () => {
    const { isUserLoggedIn } = useUserLogined();
    const { doFecthProducts } = useProducts();
    const router = useRouter();
    const checkUserLogin = () => {
        if (isUserLoggedIn) {
            console.log("user is logined verify user logiend");
            doFecthProducts()
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
