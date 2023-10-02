import ProductForm from '@/components/AddProductDetails'
import Dashboard from '@/components/Dashboard'
import React from 'react'


const page = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4 border-b-4 border-blue-400 pb-2">Add Product</h1>
      <Dashboard />
    </div>
  )
}

export default page
