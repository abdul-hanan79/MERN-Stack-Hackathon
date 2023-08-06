'use client'
import React from 'react'

import LoginForm from '../../components/loginForm'
const page = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4 border-b-4 border-blue-400 pb-2">Login</h1>

      <LoginForm />
    </div>
  )
}

export default page
