import * as Yup from "yup";


export const ratingSchema = Yup.object().shape({
    rating: Yup.number().required('Rating is required'),
    review: Yup.string().required('Review is required'),
    productId: Yup.string().required('ProductId is required'),
    userId: Yup.string().required('UserId is required'),
})