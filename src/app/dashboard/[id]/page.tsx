
import ProductForm from '@/components/AddProductDetails';
import React from 'react'

const page = ({ params }: any) => {
    console.log("params", params);
    const productId = params.id
    // const router = useRouter()
    return (
        <div>


            <h1 className="text-4xl font-bold text-center text-blue-600 mb-4 border-b-4 border-blue-400 pb-2">Upate Product</h1>

            <ProductForm editable={true} productId={productId} />
        </div>
    )
}

export default page
