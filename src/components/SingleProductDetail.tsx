import useProducts from '@/customHooks/useProducts'
import { productItemType } from '@/types/types';
import Image from 'next/image';
import React from 'react'

const SingleProductDetail = (props: any) => {
    console.log("props.item", props.item);
    const { products } = useProducts();
    console.log("products in cart ", products);
    const filteredProduct = products.filter((product: productItemType) => product.id == props.item.productId)
    console.log("filtered product in cartProduct Details", filteredProduct);
    return (
        <div className='w-auto bg-emerald-50'>
            {
                filteredProduct?.map((item: productItemType, index: number) => {
                    return (
                        <div key={index} className='flex rounded-lg shadow-md gap-3'>
                            <div>
                                <Image alt="image" src={item?.image} height={30} width={100} />
                            </div>
                            <div>
                                <p className='text-xl font-bold'>{item?.name}</p>
                                <p className='text-sm '>{item?.id}</p>

                                <p className='text-lg'>{item?.description}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SingleProductDetail
