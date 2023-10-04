import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";
import axios from "axios";
import { loginUserType, signupUserType } from "@/types/types";
import axiosWithToken from "@/services/axios";

export const fetchCurrentUser = createAsyncThunk('authUser/fetchCurrentUser', async () => {
    try {
        const value: any = {
            fetchCurrentUser: true,
        }
        const result = await axiosWithToken.get('http://localhost:8080/user/fetchCurrentUser', { params: { value } })
        console.log("result ", result.data);
        const userData = result.data
        console.log("UserData", userData);
        return userData
    } catch (error: any) {
        console.log("error in fetchCurrentUser", error.message);
    }
})
export const signupUser = createAsyncThunk('authUser/signupUser', async (user: signupUserType) => {
    try {
        console.log('signupUser /authi slice', user)
        const signupUser = await axios.post("http://localhost:8080/user/signupUser", { user })
        console.log("the user i singup", signupUser);
        const signupedUser = signupUser.data;
        console.log("signupedUser Data is", signupedUser);
        return signupedUser
    }
    catch (e) {
        console.log("error in singup user", e);
    }
})
export const loginUser = createAsyncThunk('auth/loginUser', async (userCredentials: loginUserType) => {
    console.log("the logined user", userCredentials);
    try {
        const user = await axios.post("http://localhost:8080/user/loginUser", { email: userCredentials.email, password: userCredentials.password })
        console.log("logined user data is", user);
        const userData = user.data
        localStorage.setItem("token", userData.token)
        console.log("UserData", userData);
        return userData
    }
    catch (e) {
        console.log("login error", e);

    }

})
// export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {

//     try {
//         console.log("signoutuser is working");
//         await auth.signOut();
//     }
//     catch (e) {
//         console.log("singOut error", e)

//     }

// })

const initialState = {
    user: {},
    isLoggedIn: false,
    userRole: null,
    error: null,
    signupUser: {},
    currentUserRequestLoader: true,
    userFetched:false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut: (state) => {
            // console.log("action payload in ==>signout", action.payload);
            // let newState = state;
            // console.log("state in ==>signput",newState);
            // newState = action.payload.initialStateValues;
            // console.log("new state is in ==>signout", newState);
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.fulfilled, (state, action) => {
            let newState: any = {
                ...state,
                signupUser: action.payload,
            };
            console.log("newState after signup", newState);
            return newState;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log("the user at login is", action.payload);
            if (action.payload) {
                let newState: any = {
                    ...state,
                    user: action.payload,
                    userRole: action.payload.role,
                    isLoggedIn: action.payload.message == "successfull" ? true : false,
                    currentUserRequestLoader: false /*this is extra*/
                };
                console.log("user after login", newState.user);
                return newState;
            }

            return state
        });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            console.log("the user at fetch current user is", action.payload);
            if (action.payload) {
                let newState: any = {
                    ...state,
                    user: action.payload,
                    userRole: action.payload.role,
                    isLoggedIn: action.payload.message == "successfull" ? true : false,
                    currentUserRequestLoader: false /*this is extra*/,
                    userFetched:true
                };
                console.log("user after fetching user", newState);
                return newState;
            }
            return state
        });
    }
})

export const { signOut } = authSlice.actions

export default authSlice.reducer