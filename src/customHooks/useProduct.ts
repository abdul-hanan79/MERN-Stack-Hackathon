import { fetchProducts } from '@/store/productSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useProduct = () => {
    // const allProducts=useSelector((state:any)=>state.productSl)
    const dispatch = useDispatch()
    const getAllProducts = async () => {
        await dispatch(fetchProducts)
    }

    return {

    }
}

export default useProduct
