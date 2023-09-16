import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
export const store = configureStore({
    reducer: {
        authSlice,
    
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
