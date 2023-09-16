

export type signupUserType = {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string
}
export type loginUserType = {
    email: string;
    password: string;
}

export type prodcutType = {
    name: string,
    category?: string,
    description: string,
    price: number,
    color: string,
    size: number,
    // images: Yup.array().of(Yup.string().url('Invalid image URL')).required('Product images are required'),
    stock: number,
    userId?: string,
    // ratings: Yup.array().of(
    //     Yup.object().shape({
    //         userId: Yup.string().required('User ID is required'),
    //         rating: Yup.number().required('Rating is required'),
    //         review: Yup.string().required('Review is required'),
    //     })
    // ),
}