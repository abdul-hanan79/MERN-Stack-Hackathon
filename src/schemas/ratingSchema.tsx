import * as Yup from "yup";


export const ratingSchema = Yup.object().shape({
    rating: Yup.number()
        .min(0, 'Value must be at least 0')
        .max(5, 'Value must not exceed 5')
        .required('Value is required'),
    review: Yup.string().required('Review is required'),
    productId: Yup.string().required('ProductId is required'),
    userId: Yup.string().required('UserId is required'),
})