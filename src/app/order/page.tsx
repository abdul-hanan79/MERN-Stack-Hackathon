import Order from '@/components/Order'
import React from 'react'

const page = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-4 border-b-4 border-blue-400 pb-2">All Orders</h1>

            <Order />
        </div>
    )
}

export default page
