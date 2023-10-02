'use client'
import useProducts from "@/customHooks/useProducts";
import { ProductSchema, UpdateProductSchema } from "@/schemas/productSchema";
import { useFormik, ErrorMessage, Field } from "formik";
import InputBlock from "./InputBlock";
import Button from "./ui/Button";
import Image from 'next/image'
import useDashboard from "@/customHooks/useDashboard";
import PreviewImage from "./PreviewImage";
import { productItemType } from "@/types/types";
const ProductForm = (props: any) => {
    const { editable, productId } = props
    const { products } = useProducts()
    console.log("all products in product full details ", products);
    const product = products?.filter((item: productItemType) => item.id == productId)
    console.log("single product", product);
    console.log("product id", product.id);
    console.log("value of editable and product initial values", editable, product);
    const { checkUserLogin, loader, setLoader, } = useDashboard();
    const { uploadProductDetails, doUpdateProduct } = useProducts();
    const updateProductValues = {
        name: product[0]?.name,
        description: product[0]?.description,
        price: product[0]?.price,
        color: product[0]?.color,
        size: product[0]?.size,
        category: product[0]?.category,
        image: product[0]?.image,
        stock: product[0]?.stock,
    }
    console.log("updated product values", updateProductValues);
    const initialValues = {
        name: '',
        description: '',
        price: '',
        color: '',
        size: '',
        category: ['clothes', 'shoes', 'accessories'],
        // images: [],
        image: '',
        stock: '',
        // ratings: [{ userId: '', rating: '', review: '' }],
    };
    const { values, handleBlur, handleSubmit, handleChange, isValid, setFieldValue, errors, touched } =
        useFormik({
            initialValues: !editable ? initialValues : updateProductValues,
            validationSchema: !editable ? ProductSchema : UpdateProductSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values: any, action) => {
                console.log("values in add producte details", values);
                setLoader(true)
                if (!editable) {
                    await uploadProductDetails(values)
                }
                else {
                    await doUpdateProduct(values, product)
                }
                console.log("after uploading");
                action.resetForm()
                setLoader(false)
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
                            {!editable && values.image && <PreviewImage file={values.image} />}

                            {!editable ? <InputBlock label="Product Image" type="file" name="image" id="image" onChange={(event: any) => {
                                setFieldValue("image", event.target.files[0])
                            }} onBlur={handleBlur} error={errors.image} touched={touched.image} className='appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' /> : <p>hello</p>}
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
                            </div>
                            <InputBlock label="Price" type="number" name="price" id="price" placeholder="enter produce price" value={values.price} onChange={handleChange} onBlur={handleBlur} error={errors.price} touched={touched.price} />

                            <InputBlock label="Color" type="text" name="color" id="color" placeholder="Product Color" value={values.color} onChange={handleChange} onBlur={handleBlur} error={errors.color} touched={touched.color} />

                            <InputBlock label="Size" type="text" name="size" id="size" placeholder="Product Size" value={values.size} onChange={handleChange} onBlur={handleBlur} error={errors.size} touched={touched.size} />
                            <InputBlock label="Stock" type="number" name="stock" id="stock" placeholder="Product Stock" value={values.stock} onChange={handleChange} onBlur={handleBlur} error={errors.stock} touched={touched.stock} />
                            <Button title="Upload" type="submit" loading={loader} isValid={isValid} />
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
};
export default ProductForm;
