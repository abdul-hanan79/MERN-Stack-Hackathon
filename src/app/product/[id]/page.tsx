import ProductFullDetails from '@/components/ProductFullDetails';
import useProducts from '@/customHooks/useProducts';
import { useRouter } from 'next/router';
import React from 'react'

const page = ({ params }: any) => {
    console.log("params", params);
    const productId = params.id
    // product id =12234
    // const router = useRouter()
    return (
        <div>
            {/* <p>{productId}</p> */}
            <ProductFullDetails id={productId} />
        </div>
    )
}

export default page
