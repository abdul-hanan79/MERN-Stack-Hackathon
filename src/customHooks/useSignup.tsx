import { signupUserType } from "@/types/types"

import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { signupUser } from "@/store/authSlice"
import { useRouter } from "next/navigation";
import App from "next/app"

export const useSignup = () => {
    const signupUserDetails = useSelector((state:any) => state.authSlice.signupUser.data)

    console.log("signup user", signupUserDetails)
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
        if (signupUserDetails.data.message == "success") {
            router.push('/login')
        }
        else {
            alert("user not signped")
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

