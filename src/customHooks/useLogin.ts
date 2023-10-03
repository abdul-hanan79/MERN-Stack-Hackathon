import { loginUserType, signupUserType } from "@/types/types"
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { loginUser, signOut } from "@/store/authSlice"
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { useUserLogined } from "@/customHooks/utils/userLogined"


export const useLogin = () => {
  const [loader, setLoader] = useState(false)
  const router = useRouter();
  const [loginError, setLoginError] = useState(null)
  const { isUserLoggedIn } = useUserLogined();
  // const userLogined = useSelector((state: any) => state.authSlice.isLoggedIn)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const doLogin = async (values: loginUserType) => {
    try {
      console.log("values in login use loging", values)
      const userCredentials: loginUserType = {
        email: values.email,
        password: values.password,
      }
      console.log("new user is", userCredentials);
      const action: any = await dispatch(loginUser(userCredentials))
      console.log("action", action);
      // console.log("user is logined", isUserLoggedIn);
      if (action.payload.message == "successfull") {
        // User logged in successfully
        router.push('/');
      } else {
        console.log("error in login ", action.payload.error);
        setLoginError(action.payload.error);
      }
    }
    catch (error) {
      console.log("errors in login", error)
    }

  }

  const goToLogin = () => {
    // router.push('/login');
  };
  const doSignout = async () => {
    console.log("do signout");
    await dispatch(signOut())
  }
  return {
    doLogin,
    loginError,
    goToLogin,
    loader,
    setLoader,
    doSignout
  }
}

