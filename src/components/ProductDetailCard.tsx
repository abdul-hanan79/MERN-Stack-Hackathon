'use client'
import useProducts from '@/customHooks/useProducts'
import useVerifyUserLogined from '@/customHooks/utils/useVerifyUserLogined'
import { productItemType } from '@/types/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Spinner from './ui/Spinner'
import ReactIcons from 'react-icons';
import Link from 'next/link'
import { useUserLogined } from '@/customHooks/utils/useUserLogined'
import SimpleButton from './ui/SimpleButton'
import ProductFilter from './FilterProducts'
const ProductDetailCard = () => {
    const { loginUserDetails } = useUserLogined();
    const { checkUserLogin } = useVerifyUserLogined();
    const { products, loader, doDeleteProduct } = useProducts()
    const [filteredProducts, setFilteredProducts] = useState(products);
    useEffect(() => {
        checkUserLogin()
    }, [])
    useEffect(() => {
        setFilteredProducts(products)
    }, [products])

    const handleFilter = (filteredProducts: any) => {
        console.log("this is working");
        setFilteredProducts(filteredProducts);
    };
    return (
        <div>
            <ProductFilter products={products} onFilter={handleFilter} />
            {loader ? <Spinner /> : <div className="container mx-auto">
                <div className="flex flex-wrap -mx-4">
                    {filteredProducts?.map((item: productItemType, index: number) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                            <Link href={`/product/${item.id}`}>
                                <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                                    <div className="relative  overflow-hidden">
                                        <Image src={item.image} alt="image" height={250} width={250} />
                                    </div>
                                    <div className="p-4">
                                        <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                            {item.category}
                                        </span>
                                        <h2 className="mt-2 mb-2 font-bold text-lg">
                                            {item.name}
                                        </h2>
                                        <div className='flex justify-between'>
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
                                    </div>
                                </div>
                            </Link>
                        </div>

                    ))}
                </div>

            </div>
            }
        </div>
    )
}

export default ProductDetailCard
