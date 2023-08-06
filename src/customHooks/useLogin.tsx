import { loginUserType, signupUserType } from "@/types/types"

import { useDispatch } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { loginUser } from "@/store/authSlice"
// import { useRouter } from "next/router"

export const useLogin = () => {
    // const router = useRouter();
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

    const doLogin = async (values: loginUserType) => {
        try {
            console.log("values in signup", values)
            const userCredentials: loginUserType = {
                email: values.email,
                password: values.password,
            }
            console.log("new user is", userCredentials);
            await dispatch(loginUser(userCredentials))
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

