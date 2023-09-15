import React from 'react'

const useProducts = () => {
    const uploadProductDetails = async (values) => {
        console.log("values", values);
    }
    return {
        uploadProductDetails
    }
}

export default useProducts
