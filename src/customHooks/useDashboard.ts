import { useRouter } from "next/navigation";

import React from 'react'
import { useSelector } from 'react-redux'

const useDashboard = () => {
    const userLogined = useSelector((state: any) => state.authSlice.isLoggedIn)
    console.log("user is logined", userLogined);
    const router = useRouter();
    const checkUserLogin = () => {
        if (userLogined) {
            router.push("/dashboard")
        }
        else {
            router.push("/login")
        }
    }
    return {
        checkUserLogin
    }
}
export default useDashboard
