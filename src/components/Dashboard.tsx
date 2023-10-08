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

    const { checkUserLogin } = useVerifyUserLogined()
    useEffect(() => {
        checkUserLogin()
    }, [])
    const { showAddProductForm, setShowAddProductForm, doHideUnhide, loader, loginUserDetails } = useDashboard()
    const { products, doDeleteProduct } = useProducts()
    console.log("products in dashboard", products);
    console.log("user id is ", loginUserDetails.id);
    const filteredProductItems = products?.filter((item: productItemType) => item.userId == loginUserDetails.id)
    console.log("filtered products in dashboard", filteredProductItems);
    return (
        <div>
            <div className='flex justify-center mb-4'>
                <SimpleButton title="Add New Product" onClick={doHideUnhide} />
            </div>
            {showAddProductForm && <ProductForm editable={false} />}
            <div>
                <div className="c-card block bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:bg-gradient-to-l shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                    <div className="p-4 text-white">
                        <h1 className="mb-2 font-bold text-center">
                            All Products
                        </h1>
                    </div>
                </div>
                {loader ? <Spinner /> : <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        {filteredProductItems?.map((item: productItemType, index: number) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                {/* <Link href={`/product/${item.id}`}> */}
                                <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                                    <div className="">
                                        <Image src={item.image} alt="image" height={250} width={250} />
                                    </div>
                                    <div className="p-4">
                                        <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                            {item.category}
                                        </span>
                                        <div className="relative flex items-center">
                                            <Image className="w-10 h-10 rounded-full" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" alt="avatgar" height={20} width={20} />
                                            <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                            <p className='text-xs text-slate-400'>{item.userId}</p>
                                        </div>
                                        <h2 className="mt-2 mb-2 font-bold text-lg">
                                            {item.name}
                                        </h2>
                                        <div className='flex justify-between mb-4'>
                                            <div className="flex ">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p>{item.price}</p>
                                            </div>
                                            <div className="flex ">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                </svg>
                                                <p>{item.stock}</p>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <SimpleButton title="Delte" onClick={() => {
                                                doDeleteProduct(item)
                                            }} />
                                            <Link href={`/dashboard/${item.id}`}>
                                                {/* <SimpleButton title="udpate product" /> */}
                                                {/* <SimpleButton title="Update Product" /> */}
                                                <p className='text-sm hover:underline'>Update</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* </Link> */}
                            </div>
                            // 
                        ))}
                    </div>

                </div>
                }
            </div>
        </div>
    )

}

export default Dashboard
