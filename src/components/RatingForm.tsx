import { ratingSchema } from '@/schemas/ratingSchema'
import { useFormik } from 'formik'
import React from 'react'
import InputBlock from './InputBlock'
import Button from './ui/Button'
import { useUserLogined } from '@/customHooks/utils/useUserLogined'
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
    console.log("touched.review", touched.review);
    console.log("touched.rating", touched.rating);
    return (
        <div>
            <div className="flex ">
                <div className="mx-auto p-5 ">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <InputBlock label="Rating" type="number" name="rating" id="rating" placeholder="Enter Product Rating b/w 0-5" value={values.rating} onChange={handleChange} onBlur={handleBlur} error={errors.rating} touched={touched.rating} />
                        <textarea className='rounded-lg focus:ring-2 focus:ring-yellow-400  shadow-md p-3 focus:outline-4  outline-none' name='review' value={values.review} onChange={handleChange} onBlur={handleBlur} placeholder='Enter your reviews' />
                        {errors.review && touched.review ? (
                            <p className="form-error text-rose-700">{errors.review}</p>
                        ) : null}
                        <Button title="Submit Review" type="submit" loading={loader} isValid={isValid} className="w-full"
                        />
                        {/* <SimpleButton className="w-full" title="Add To Cart" loading={loader} onClick={() => {
                                        doAddToCart(item)
                                    }} />  <SimpleButton className="w-full" title="Add To Cart" loading={loader} onClick={() => {
                                        doAddToCart(item)
                                    }} /> */}
                    </form>
                </div >
            </div >
        </div >
    )
}

export default RatingForm
