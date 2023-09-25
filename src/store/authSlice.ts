import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";
import axios from "axios";
import { loginUserType, signupUserType } from "@/types/types";

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



const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        isLoggedIn: false,
        userRole: null,
        error: null,
        signupUser: {},
        currentUserRequestLoader: true,
    },
    reducers: {},
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

            return {
                ...state
            };
        });

        // builder.addCase(signOutUser.fulfilled, (state, action) => {
        //     console.log("signoutuser in extra reducer");
        //     let newState = {
        //         user: {},
        //         isLoggedIn: false,
        //         error: null,
        //         signupUser: {},
        //         currentUserRequestLoader: true,
        //     }
        //     console.log("the new state is", newState);
        //     return newState
        // })
    }

})

export default authSlice.reducer