import * as Yup from "yup";

export const ProductSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    category: Yup.mixed().oneOf(['clothes', 'shoes', 'accessories'] as const).defined().required("Category is required"),
    description: Yup.string().required('Product description is required'),
    price: Yup.number().required('Product price is required'),
    color: Yup.string().required('Product color is required'),
    size: Yup.string().required('Product size is required'),
    image: Yup.mixed().required().test("FILE_TYPE", "invalid", (value: any) => value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type)),
    // .test("FILE_SIZE", "TOO BIG ", (value: any) => value && value.size < 1024 * 1024)
    stock: Yup.number().required('Product stock is required'),
});
export const UpdateProductSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    category: Yup.mixed().oneOf(['clothes', 'shoes', 'accessories'] as const).defined().required("Category is required"),
    description: Yup.string().required('Product description is required'),
    price: Yup.number().required('Product price is required'),
    color: Yup.string().required('Product color is required'),
    size: Yup.string().required('Product size is required'),
    image: Yup.string().required('Product size is required'),
    stock: Yup.number().required('Product stock is required'),
});

{/* <option value="" label="Select an option" />
<option value="clothes" label="Clothes" />
<option value="shoes" label="Shoes" />
<option value="accessories" label="Accessories" /> */}