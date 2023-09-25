import React from 'react'

const ErrorBox = (props: any) => {
    return (
        <div className='bg-red-500 text-white p-2 rounded-md shadow-md w-auto max-w-screen-md'>
            <p>{props.error}</p>
        </div>
    )
}

export default ErrorBox
