'use client'
import React from 'react'

import SignupForm from '../../components/SignupForm'

const page = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4 border-b-4 border-blue-400 pb-2">Sign up Form</h1>

      <SignupForm />
    </div>
  )
}

export default page
