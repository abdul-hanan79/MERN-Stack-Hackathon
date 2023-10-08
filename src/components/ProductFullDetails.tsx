'use client'
import useProducts from '@/customHooks/useProducts'
import { productItemType } from '@/types/types'
// import { Prosto_One } from 'next/font/google'
import Image from 'next/image'
import React, { useEffect } from 'react'
import RatingForm from './RatingForm'
import SimpleButton from './ui/SimpleButton'
import { useUserLogined } from '@/customHooks/utils/useUserLogined'
import useRating from '@/customHooks/useRating'
import useCart from '@/customHooks/useCart'
import useVerifyUserLogined from '@/customHooks/utils/useVerifyUserLogined'
// import from 'next/dynamic'
const ProductFullDetails = (props: any) => {
    const { products } = useProducts()
    const { loginUserDetails } = useUserLogined()
    const { doDeleteRating, setRatingLoader, ratingLoader } = useRating()
    const { doAddToCart, loader } = useCart()

    console.log("delete rating loader", loader);

    console.log("all products in product full details ", products);
    const product = products?.filter((item: productItemType) => item.id == props.id)
    console.log("single product", product);
    console.log("product id", product.id);
    const { checkUserLogin } = useVerifyUserLogined();
    useEffect(() => {
        checkUserLogin()
    }, [])
    return (
        <div className='p-3'>
            {/* <h1 >this is full product details card</h1> */}
            {product?.map((item: productItemType, index: number) => {
                return (
                    <div key={index} className="bg-[#e2e8f0] shadow-md hover:shadow-xl  rounded-lg overflow-hidden border-4 border-gray-100">
                        <div className="flex flex-col md:flex-row items-start mb-4 ">
                            <div className="md:w-1/2 w-full p-2">
                                <Image src={item.image} alt="image" height={100} width={400} className='block mx-auto' />
                            </div>
                            <div className="md:w-1/2 w-full p-5 bg-white">
                                <h1 className="mt-2 mb-2 font-bold lg:text-5xl md:text-3xl">
                                    {item.name.toUpperCase()}
                                </h1>
                                <div className="text-sm font-semibold text-slate-400 flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                                    <span> {item.userId}</span>
                                </div>
                                <p className="text-2xl font-bold">
                                    {item.description}
                                </p>
                                <div className='flex flex-col gap-2 mb-2'>
                                    <div className="text-md font-semibold gap-1 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span> {item.price}</span>
                                    </div>
                                    <div className="text-md font-semibold flex gap-1 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                        </svg>
                                        <span>{item.category}</span>
                                    </div>
                                    <div className="text-md font-semibold flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                        </svg>
                                        <span>{item.stock}
                                        </span>
                                    </div>
                                    <div className="text-md font-semibold flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M15 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V5.56l-3.97 3.97a.75.75 0 11-1.06-1.06l3.97-3.97h-2.69a.75.75 0 01-.75-.75zm-12 0A.75.75 0 013.75 3h4.5a.75.75 0 010 1.5H5.56l3.97 3.97a.75.75 0 01-1.06 1.06L4.5 5.56v2.69a.75.75 0 01-1.5 0v-4.5zm11.47 11.78a.75.75 0 111.06-1.06l3.97 3.97v-2.69a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h2.69l-3.97-3.97zm-4.94-1.06a.75.75 0 010 1.06L5.56 19.5h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 0z" clipRule="evenodd" />
                                        </svg>

                                        <span> {item.size}</span>
                                    </div>
                                    <div className="text-md font-semibold flex gap-1 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                                            <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z" />
                                        </svg>

                                        <span>{item.color}
                                        </span>
                                    </div>
                                    <SimpleButton className="w-full" title="Add To Cart" loading={loader} onClick={() => {
                                        doAddToCart(item)
                                    }} />
                                </div>

                                <div>
                                    <RatingForm productId={item.id} userId={loginUserDetails.id} />
                                </div>
                            </div>

                        </div>
                        <div className='shadow-md hover:shadow-xl rounded border-4 border-gray-100 p-2 bg-white '>
                            <h1 className='text-3xl text-center mb-2'>Ratings</h1>
                            {item.ratings?.map((item: any, index) => {
                                return (
                                    <div key={index} >
                                        <div className='flex gap-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                            </svg>
                                            <div className='bg-gray-200 p-2 mb-2 rounded-lg shadow-md hover:shadow-lg'>
                                                <div className='flex gap-2'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>
                                                    <span> {item.rating}</span></div>
                                                <div>
                                                    <span> {item.review}</span>
                                                </div>
                                                {item.userId == loginUserDetails.id ? <SimpleButton title="delete" loading={ratingLoader} onClick={() => {
                                                    const itemDetails = { id: item.id, productId: item.productId }
                                                    doDeleteRating(itemDetails)
                                                }} /> : null}
                                            </div>
                                        </div>

                                    </div>

                                )
                            })}
                        </div>
                    </div>

                )
            })}
        </div >
    )
}
/*
.c-card {
  transform: perspective(400px);
  transition: transform 0.3s ease-in-out;
}

.c-card:hover {
  transform: scale(1.1);
}

*/

export default ProductFullDetails
