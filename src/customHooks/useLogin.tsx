import { loginUserType, signupUserType } from "@/types/types"
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { loginUser } from "@/store/authSlice"
import { useRouter } from "next/navigation";
import { useUserLogined } from "@/utils/userLogined"


export const useLogin = () => {
    const router = useRouter();
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
            const action = await dispatch(loginUser(userCredentials))
            console.log("action", action);
            // console.log("user is logined", isUserLoggedIn);
            if (action.payload.message == "Login successful") {
                // User logged in successfully
                router.push('/dashboard');
            } else {
                alert('Error in login');
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

/*

// useLogin.js
import { loginUserType } from '@/types/types';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { loginUser } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  const doLogin = async (values: loginUserType) => {
    try {
      console.log('values in login use loging', values);
      const userCredentials: loginUserType = {
        email: values.email,
        password: values.password,
      };
      console.log('new user is', userCredentials);
      const action = await dispatch(loginUser(userCredentials));
      if (loginUser.fulfilled.match(action)) {
        // User logged in successfully
        router.push('/dashboard');
      } else {
        alert('Error in login');
      }
    } catch (error) {
      console.log('errors in login', error);
    }
  };

  const goToLogin = () => {
    // router.push('/login');
  };

  return {
    doLogin,
    goToLogin,
  };
};

*/