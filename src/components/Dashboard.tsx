'use client'
import React, { useEffect } from 'react'
import ProductForm from './AddProductDetails'
import useDashboard from '@/customHooks/useDashboard'
import SimpleButton from './ui/SimpleButton'
import useProducts from '@/customHooks/useProducts'
import Spinner from './ui/Spinner'
import { productItemType } from '@/types/types'
import Link from 'next/link'
import Image from 'next/image'
import useVerifyUserLogined from '@/customHooks/utils/useVerifyUserLogined'
import productSlice from '@/store/productSlice'

const Dashboard = () => {
    const { checkUserLogin, } = useDashboard();
    useEffect(() => {
        checkUserLogin()
    }, [])
    const { showAddProductForm, setShowAddProductForm, doHideUnhide, loader, loginUserDetails } = useDashboard()
    const { products, doDeleteProduct } = useProducts()
    console.log("products in dashboard", products);
    console.log("user id is ", loginUserDetails.id);
    const filteredProductItems = products.filter((item: productItemType) => item.userId == loginUserDetails.id)
    console.log("filtered products in dashboard", filteredProductItems);
    return (
        <div>
            <h1>this is dashboard</h1>
            <SimpleButton title="Add New Product" onClick={doHideUnhide} />
            {showAddProductForm && <ProductForm editable={false} />}
            <div>
                <div className="c-card block bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                    <div className="p-4 text-white">
                        <h1 className="mt-2 mb-2 font-bold">
                            This is product detail card
                        </h1>
                    </div>
                </div>
                {loader ? <Spinner /> : <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        {filteredProductItems?.map((item: productItemType, index: number) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                {/* <Link href={`/product/${item.id}`}> */}
                                <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                                    <div className="relative  overflow-hidden">
                                        <Image src={item.image} alt="image" height={250} width={250} />
                                    </div>
                                    <div className="p-4">
                                        <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                            {item.category}
                                        </span>
                                        <h2 className="mt-2 mb-2 font-bold">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm">
                                            {item.price}
                                        </p>
                                        <div className="mt-3 flex items-center">
                                            <span className="text-sm font-semibold">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                            </span>
                                            <span className="text-sm font-semibold ml-2">
                                                {item.stock}
                                            </span>
                                            {/* {item.userId == loginUserDetails.id ? <SimpleButton title="delete" loading={false} onClick={() => {
                                                doDeleteProduct(item)
                                            }} /> : null}
                                            <p>see more</p> */}
                                            <SimpleButton title="Delte" onClick={() => {
                                                doDeleteProduct(item)
                                            }} />
                                            <Link href={`/dashboard/${item.id}`}>
                                                {/* <SimpleButton title="udpate product" /> */}
                                                <p>go to update product</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* </Link> */}
                            </div>
                        ))}
                    </div>

                </div>
                }
            </div>
        </div>
    )

}

export default Dashboard
