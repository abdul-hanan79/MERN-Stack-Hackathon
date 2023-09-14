import { signupUserType } from "@/types/types"

import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { signupUser } from "@/store/authSlice"
import { useRouter } from "next/navigation";
import App from "next/app"

export const useSignup = () => {
    const signupUserDetails = useSelector((state:any) => state.authSlice.signupUser)

    console.log("signuped user ", signupUserDetails)
    const router = useRouter();
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

    const doSignup = async (values: any) => {
        console.log("values in signup", values)
        const newUser: signupUserType = {
            name: values.name,
            email: values.email,
            password: values.password,
        }
        console.log("new user is", newUser);
        await dispatch(signupUser(newUser))
        if (signupUserDetails.message == "success") {
            router.push('/login')
        }
        else {
            console.log("signupUserDetails",signupUserDetails.message);
            alert("user not signuped")
        }
    }
    const goToSignup = () => {
        router.push('/signup');
    };
    return {
        doSignup,
        goToSignup
    }
}

