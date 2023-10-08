import React, { useState } from 'react'
import { RootState } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { deleteRating, submitRating } from '@/store/productSlice';

const useRating = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const [ratingLoader, setRatingLoader] = useState(false)
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
            setRatingLoader(true)
            console.log("rating id ", itemDetails);
            const action = await dispatch(deleteRating(itemDetails))
            console.log("action", action);

        } catch (error: any) {
            console.log("error in submit rating", error.message);

        }
        finally {
            setRatingLoader(false)
        }

        // console.log("hello");
    }
    return {
        doSubmitRating,
        doDeleteRating,
        ratingLoader, setRatingLoader
        , loader, setLoader
    }

}

export default useRating
