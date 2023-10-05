import React from 'react'
import './ui.css'
const Spinner = (props: any) => {
    return (
        <div className={`w-6 h-6 border-4 ${props?.className || ' border-blue-600'}  rounded-full loader`}></div>
    )
}

export default Spinner
