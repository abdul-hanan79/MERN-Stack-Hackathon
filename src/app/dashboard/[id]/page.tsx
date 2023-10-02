
import ProductForm from '@/components/AddProductDetails';
import React from 'react'

const page = ({ params }: any) => {
    console.log("params", params);
    const productId = params.id
    // const router = useRouter()
    return (
        <div>
            <p>{productId}</p>
            {/* <ProductFullDetails id={productId} /> */}
            <ProductForm editable={true} productId={productId} />
        </div>
    )
}

export default page
