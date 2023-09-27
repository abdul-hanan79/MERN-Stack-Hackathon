'use client'
import useProducts from '@/customHooks/useProducts'
import { productItemType } from '@/types/types'
// import { Prosto_One } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
import RatingForm from './RatingForm'
import SimpleButton from './ui/SimpleButton'
import { useUserLogined } from '@/customHooks/utils/userLogined'
import useRating from '@/customHooks/useRating'
// import from 'next/dynamic'
const ProductFullDetails = (props: any) => {
    const { allProducts } = useProducts()
    const { loginUserDetails } = useUserLogined()
    const { doDeleteRating } = useRating()
    console.log("all products in product full details ", allProducts);
    const product = allProducts?.filter((item: productItemType) => item.id == props.id)
    console.log("single product", product);
    console.log("product id", product.id);
    return (
        <div>
            <h1 >this is full product details card</h1>
            {product?.map((item: productItemType, index: number) => {
                return (
                    <div key={index} className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2">
                                <Image src={item.image} alt="image" height={250} width={250} />
                            </div>
                            <div className="md:w-1/2 p-4">
                                <h1 className="mt-2 mb-2 font-bold lg:text-7xl md:text-2xl">
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
                                <p className="text-sm font-semibold">
                                    Stock: {item.stock}
                                </p>
                                <p className="text-sm font-semibold">
                                    Size: {item.size}
                                </p>
                                <p className="text-sm font-semibold">
                                    Color: {item.color}
                                </p>
                                <p className="text-sm font-semibold">
                                    UserId: {item.userId}
                                </p>
                                <p className="text-sm font-semibold">
                                    Color: {item.color}
                                </p>
                                {item.ratings?.map((item: any, index) => {
                                    return (
                                        <div key={index}>
                                            <p>Rating : {item.rating}</p>
                                            <p>Review : {item.review}</p>
                                            {item.userId == loginUserDetails.id ? <SimpleButton title="delte" onClick={() => {
                                                const itemDetails = { id: item.id, productId: item.productId }
                                                doDeleteRating(itemDetails)
                                            }} /> : null}
                                        </div>

                                    )
                                })}
                                <div>
                                    <RatingForm productId={item.id} userId={loginUserDetails.id} />
                                </div>
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
