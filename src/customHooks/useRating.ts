import React, { useState } from 'react'
import { RootState } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { deleteRating, submitRating } from '@/store/productSlice';

const useRating = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const [loader, setLoader] = useState(false)
    const doSubmitRating = async (values: any) => {
        try {
            console.log("values in submit raing", values);
            const action = await dispatch(submitRating(values))
            console.log("result", action);
        }
        catch (e: any) {
            console.log("error in submit rating", e.message);
        }
    }
    const doDeleteRating = async (itemDetails: any) => {
        try {
            console.log("rating id ", itemDetails);
            const action = await dispatch(deleteRating(itemDetails))
            console.log("action", action);

        } catch (error: any) {
            console.log("error in submit rating", error.message);

        }

        // console.log("hello");
    }
    return {
        doSubmitRating,
        doDeleteRating,
        loader,
        setLoader

    }

}

export default useRating
