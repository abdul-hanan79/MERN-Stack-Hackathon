'use-client'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export const useUserLogined = () => {
    const isUserLoggedIn = useSelector((state: any) => state.authSlice.isLoggedIn)
    const userRole = useSelector((state: any) => state.authSlice.userRole)
    const loginUserDetails = useSelector((state: any) => state.authSlice.user)
    // console.log("user logined userUserLogined", useUserLogined);
    console.log("logined user details", loginUserDetails);
    return {
        isUserLoggedIn,
        loginUserDetails,
        userRole,
    }
}


