import * as Yup from "yup";


export const ProductSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    // category: Yup.string().required('Product category is required'),

    category: Yup.mixed().oneOf(['clothes', 'shoes', 'accessories'] as const).defined().required("Category is required"),
    description: Yup.string().required('Product description is required'),
    price: Yup.number().required('Product price is required'),
    color: Yup.string().required('Product color is required'),
    size: Yup.string().required('Product size is required'),
    // images: Yup.array().of(Yup.string().url('Invalid image URL')).required('Product images are required'),
    stock: Yup.number().required('Product stock is required'),
    // ratings: Yup.array().of(
    //     Yup.object().shape({
    //         userId: Yup.string().required('User ID is required'),
    //         rating: Yup.number().required('Rating is required'),
    //         review: Yup.string().required('Review is required'),
    //     })
    // ),
});

{/* <option value="" label="Select an option" />
<option value="clothes" label="Clothes" />
<option value="shoes" label="Shoes" />
<option value="accessories" label="Accessories" /> */}