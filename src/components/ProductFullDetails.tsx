'use client'
import useProducts from '@/customHooks/useProducts'
import { productItemType } from '@/types/types'
import { Prosto_One } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const ProductFullDetails = (props: any) => {
    const { allProducts } = useProducts()
    console.log("all products in product full details ", allProducts);
    const product = allProducts.filter((item: productItemType) => item.id == props.id)
    console.log("single product", product);
    return (
        <div>
            <h1 >this is full product details card</h1>
            {product.map((item: productItemType, index: number) => {
                return (
                    <div key={index} className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2">
                                <Image src={item.image} alt="image" height={250} width={250} />
                            </div>
                            <div className="md:w-1/2 p-4">
                                <h1 className="mt-2 mb-2 font-bold lg:text-9xl md:text-2xl">
                                    {item.name}
                                </h1>
                                <p className="text-sm">
                                    {item.description}
                                </p>
                                <p className="text-sm font-semibold">
                                    Price: {item.price}
                                </p>
                                <p className="text-sm font-semibold">
                                    Category: {item.category}
                                </p>
                            </div>
                        </div>
                    </div>

                )
            })}
        </div>
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
