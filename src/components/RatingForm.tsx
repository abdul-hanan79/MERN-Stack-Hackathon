import { ratingSchema } from '@/schemas/ratingSchema'
import { useFormik } from 'formik'
import React from 'react'
import InputBlock from './InputBlock'
import Button from './ui/Button'
import { useUserLogined } from '@/customHooks/utils/userLogined'
import useRating from '@/customHooks/useRating'

const RatingForm = (props: any) => {
    const { doSubmitRating,
        doDeleteRating,
        loader,
        setLoader
    } = useRating()

    const initialValues = {
        rating: '',
        review: '',
        productId: props.productId,
        userId: props.userId,
    }
    const { values, handleBlur, handleSubmit, handleChange, isValid, setFieldValue, errors, touched } =
        useFormik({
            initialValues: initialValues,
            validationSchema: ratingSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                setLoader(true)
                console.log("values", values);
                await doSubmitRating(values)
                setLoader(false)
                action.resetForm()
            }
        })
    console.log("error", errors)
    console.log("isvalid", isValid)
    console.log("values", values);
    return (
        <div>
            <div className="flex ">
                <div className="mx-auto p-5 ">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <InputBlock label="Rating" type="number" name="rating" id="rating" placeholder="Enter Product Rating" value={values.rating} onChange={handleChange} onBlur={handleBlur} error={errors.rating} touched={touched.rating} />
                        <InputBlock label="Reviews" type="text" name="review" id="review" placeholder="Enter Product Review" value={values.review} onChange={handleChange} onBlur={handleBlur} error={errors.review} touched={touched.review} />
                        <Button title="Submit Review" type="submit" loading={loader} isValid={isValid} />
                    </form>
                </div >
            </div >
        </div >
    )
}

export default RatingForm
