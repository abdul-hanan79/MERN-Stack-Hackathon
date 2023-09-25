import React from 'react'
import { useRouter } from "next/navigation";
import { useUserLogined } from './userLogined';

const useVerifyUserLogined = () => {
    const { isUserLoggedIn } = useUserLogined();
    const router = useRouter();
    const checkUserLogin = () => {
        if (isUserLoggedIn) {
            console.log("user is logined verify user logiend");
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
