'use client'
import useVerifyUserLogined from '@/customHooks/utils/useVerifyUserLogined'
import React, { useEffect } from 'react'
const ProductDetailCard = () => {
    const { checkUserLogin } = useVerifyUserLogined()
    useEffect(() => {
        checkUserLogin()
    })
    return (
        <div>
            <h1>this is product detail card</h1>
        </div>
    )
}

export default ProductDetailCard
