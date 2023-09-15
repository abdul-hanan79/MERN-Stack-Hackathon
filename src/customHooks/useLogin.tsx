import { loginUserType, signupUserType } from "@/types/types"

import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { loginUser } from "@/store/authSlice"
// import { Router } from "next/router"
import { useRouter } from "next/navigation";

// import { useRouter } from "next/router"

export const useLogin = () => {
    const router = useRouter();
    const userLogined = useSelector((state: any) => state.authSlice.isLoggedIn)
    console.log("userlogied useLogin", userLogined);
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const doLogin = async (values: loginUserType) => {
        try {
            console.log("values in login use loging", values)
            const userCredentials: loginUserType = {
                email: values.email,
                password: values.password,
            }
            console.log("new user is", userCredentials);
            await dispatch(loginUser(userCredentials))
            console.log("user is logined", userLogined);
            if (userLogined) {
                router.push("/dashboard")
            }
            else{
                alert("error in login ")
            }

        }
        catch (error) {
            console.log("errors in login", error)
        }

    }

    const goToLogin = () => {
        // router.push('/login');
    };
    return {
        doLogin,
        goToLogin
    }
}

