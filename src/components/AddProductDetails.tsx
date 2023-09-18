'use client'
import useProducts from "@/customHooks/useProducts";
import { ProductSchema } from "@/schemas/productSchema";
import { useFormik, ErrorMessage, Field } from "formik";
import InputBlock from "./InputBlock";
import Button from "./ui/Button";
import { useEffect } from "react";
// import Select from 'react-select';
import useDashboard from "@/customHooks/useDashboard";
const ProductForm = () => {
    const { checkUserLogin } = useDashboard();
    useEffect(() => {
        checkUserLogin()
    })
    const options = [
        { value: 'clothes', label: 'Clothes' },
        { value: 'shoes', label: 'Shoes' },
        { value: 'accessories', label: 'Accessories' },
        // Add more options as needed
    ];
    const { uploadProductDetails } = useProducts();
    const initialValues = {
        name: '',
        description: '',
        price: '',
        color: '',
        size: '',
        category: ['clothes', 'shoes', 'accessories'],
        // images: [],
        stock: '',
        // category: '',
        // ratings: [{ userId: '', rating: '', review: '' }],
    };
    const { values, handleBlur, handleSubmit, handleChange, isValid, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: ProductSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values: any, action) => {
                console.log("values in add producte details", values);
                uploadProductDetails(values)
                action.resetForm()
            }

        })

    console.log("error", errors)
    console.log("isvalid", isValid)
    console.log("values", values);
    return (
        <>
            <div className="container mx-auto">
                <div className="flex ">
                    <div className="mx-auto p-5 ">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <InputBlock label="Product Name" type="text" name="name" id="name" placeholder="Product Name" value={values.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} touched={touched.name} />

                            <InputBlock label="Descriptions" type="text" name="description" id="description" className='rounded-lg shadow-md p-1 border rounded w-full h-20 px-3 text-gray-700' placeholder="Product Description" value={values.description} onChange={handleChange} onBlur={handleBlur} error={errors.description} touched={touched.description} />

                            <div className="mb-4">
                                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                                    Select an option
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className="w-full"
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="" label="Select an option" />
                                    <option value="clothes" label="Clothes" />
                                    <option value="shoes" label="Shoes" />
                                    <option value="accessories" label="Accessories" />
                                </select>

                                {/* {touched.selectedOption && errors.selectedOption && (
                                    <div className="text-red-500 text-xs italic">{errors.selectedOption}</div>
                                )} */}
                            </div>                            <InputBlock label="Price" type="number" name="price" id="price" placeholder="enter produce price" value={values.price} onChange={handleChange} onBlur={handleBlur} error={errors.price} touched={touched.price} />

                            <InputBlock label="Color" type="text" name="color" id="color" placeholder="Product Color" value={values.color} onChange={handleChange} onBlur={handleBlur} error={errors.color} touched={touched.color} />

                            <InputBlock label="Size" type="text" name="size" id="size" placeholder="Product Size" value={values.size} onChange={handleChange} onBlur={handleBlur} error={errors.size} touched={touched.size} />
                            <InputBlock label="Stock" type="number" name="stock" id="stock" placeholder="Product Stock" value={values.stock} onChange={handleChange} onBlur={handleBlur} error={errors.stock} touched={touched.stock} />
                            <Button title="Upload" type="submit" />
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
};
export default ProductForm;
