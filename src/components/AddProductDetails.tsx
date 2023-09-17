'use client'
import useProducts from "@/customHooks/useProducts";
import { ProductSchema } from "@/schemas/productSchema";
import { useFormik, ErrorMessage, Field } from "formik";
import InputBlock from "./InputBlock";
import Button from "./ui/Button";
const ProductForm = () => {
    const { uploadProductDetails } = useProducts();
    const initialValues = {
        name: '',
        description: '',
        price: '',
        color: '',
        size: '',
        category: '',
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

    return (
        <>
            <div className="container mx-auto">
                <div className="flex ">
                    <div className="mx-auto p-5 ">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <InputBlock label="Product Name" type="text" name="name" id="name" placeholder="Product Name" value={values.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} touched={touched.name} />

                            <InputBlock label="Descriptions" type="text" name="description" id="description" className='rounded-lg shadow-md p-1 border rounded w-full h-20 px-3 text-gray-700' placeholder="Product Description" value={values.description} onChange={handleChange} onBlur={handleBlur} error={errors.description} touched={touched.description} />

                            <InputBlock label="Price" type="number" name="price" id="price" placeholder="enter produce price" value={values.price} onChange={handleChange} onBlur={handleBlur} error={errors.price} touched={touched.price} />

                            <div className="mb-4">
                                {/* label="Descriptions" type="text" name="description" id="description"  placeholder="Product Description" value={values.description} onChange={handleChange} onBlur={handleBlur} error={errors.description} touched={touched.description} */}
                                <label htmlFor="selectedOption" className="block text-gray-700 text-sm font-bold mb-2">
                                    Select an option
                                </label>
                                <Field
                                    as="select"
                                    id="category"
                                    name="category"
                                    className={`block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="" label="Select an option" />
                                    <option value="clothes" label="Clotehs" />
                                    <option value="shoes" label="Shoes" />
                                    <option value="accessories" label="Accessories" />
                                </Field>
                                <ErrorMessage
                                    name="category"
                                    component="p"
                                    className="text-red-500 text-xs italic"
                                />
                            </div>

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
