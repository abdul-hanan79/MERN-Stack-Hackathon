
'use client'
import useProducts from "@/customHooks/useProducts";
import { ProductSchema } from "@/schemas/productSchema";
import { useFormik, ErrorMessage, Field } from "formik";


const ProductForm = () => {
    // const onSubmit = () => console.log("hello");
    const { uploadProductDetails } = useProducts();
    const initialValues = {
        name: '',
        description: '',
        price: '',
        color: '',
        size: '',
        images: [],
        stock: '',
        category: '',
        ratings: [{ userId: '', rating: '', review: '' }],
    };
    const { values, handleBlur, handleSubmit, handleChange, isValid, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: ProductSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values, action) => {
                console.log("values in add producte details", values);
                uploadProductDetails(values)
                action.resetForm()
            }
        })
    return (
        <>
            <div className="container mx-auto">
                <div className="flex ">
                    <div className="mx-auto p-5 ">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="input-block">
                                <label htmlFor="name" className="block text-md font-medium text-slate-700F">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    id="name"
                                    className="rounded-lg shadow-md p-1 w-full"

                                    placeholder="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? (
                                    <p className="form-error text-rose-700">{errors.name}</p>
                                ) : null}
                            </div>
                            <div className="input-block">
                                <label htmlFor="description" className="block text-md font-medium text-slate-700F">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="description"
                                    id="description"
                                    className="rounded-lg shadow-md p-1 border rounded w-full h-20 px-3 text-gray-700"

                                    placeholder="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.description && touched.description ? (
                                    <p className="form-error text-rose-700">{errors.description}</p>
                                ) : null}
                            </div>

                            <div className="input-block">
                                <label htmlFor="price" className="block text-md font-medium text-slate-700F">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    autoComplete="off"
                                    name="price"
                                    id="price"
                                    className="rounded-lg shadow-md p-1"

                                    placeholder="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.price && touched.price ? (
                                    <p className="form-error text-rose-700">{errors.price}</p>
                                ) : null}
                            </div>
                            <div className="input-block">
                                <label htmlFor="color" className="block text-md font-medium text-slate-700F">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="color"
                                    id="color"
                                    className="rounded-lg shadow-md p-1"

                                    placeholder="color"
                                    value={values.color}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.color && touched.color ? (
                                    <p className="form-error text-rose-700">{errors.description}</p>
                                ) : null}
                            </div>
                            <div className="input-block">
                                <label htmlFor="size" className="block text-md font-medium text-slate-700F">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="size"
                                    id="size"
                                    className="rounded-lg shadow-md p-1"

                                    placeholder="description"
                                    value={values.size}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.size && touched.size ? (
                                    <p className="form-error text-rose-700">{errors.size}</p>
                                ) : null}
                            </div>
                            <div className="input-block">
                                <label htmlFor="stock" className="block text-md font-medium text-slate-700F">
                                    stock
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="stock"
                                    id="stock"
                                    className="rounded-lg shadow-md p-1"

                                    placeholder="stock"
                                    value={values.stock}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.stock && touched.stock ? (
                                    <p className="form-error text-rose-700">{errors.stock}</p>
                                ) : null}
                            </div>
                            {/* <div className="input-block">
                                <label htmlFor="size" className="block text-md font-medium text-slate-700F">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="size"
                                    id="size"
                                    className="rounded-lg shadow-md p-1"

                                    placeholder="size"
                                    value={values.size}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.size && touched.size ? (
                                    <p className="form-error text-rose-700">{errors.description}</p>
                                ) : null}
                            </div> */}
                            <div className="modal-buttons">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                                    type="submit"
                                // disabled={!isValid}
                                >
                                    Upload
                                </button>
                            </div>

                        </form>

                    </div>
                </div >

            </div >



        </>
    )
};

export default ProductForm;
