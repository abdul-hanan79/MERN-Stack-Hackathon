import { signupUserType } from "@/types/types"

import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { signupUser } from "@/store/authSlice"
import { useRouter } from "next/navigation";
import App from "next/app"
import { useState } from "react"

export const useSignup = () => {
    const router = useRouter();
    const [loader, setLoader] = useState(false)
    const [signupError, setSignupError] = useState(null)
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

    const doSignup = async (values: any) => {
        try {
            setLoader(true)
            console.log("values in signup", values)
            const newUser: signupUserType = {
                name: values.name,
                email: values.email,
                password: values.password,
            }
            console.log("new user is", newUser);
            const action = await dispatch(signupUser(newUser))
            console.log("the signup user is", action);
            if (action.payload.message == "successfull") {
                router.push('/login')
            }
            else {
                console.log("signupUserDetails", action.payload.message);
                // alert("user not signuped")
                setSignupError(action.payload.error)
            }
        } catch (error: any) {
            console.log("error in signupUserDetails", error.message);

        }
        finally {
            setLoader(false
            )
        }
    }
    const goToSignup = () => {
        router.push('/signup');
    };
    return {
        doSignup,
        goToSignup,
        signupError,
        loader,
        setLoader
    }
}

