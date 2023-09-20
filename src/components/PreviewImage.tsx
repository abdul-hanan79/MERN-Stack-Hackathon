import Image from 'next/image'
import React, { useState } from 'react'

const PreviewImage = ({ file }: any) => {
    const [preview, setPreview] = useState('')
    if (file) {
        const reader: any = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreview(reader.result)
        }
    }
    return (
        // <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <Image
                src={preview}
                alt="image"
                height={200}
                width={200}
                style={{ maxWidth: '100%' }}
            />
        // </div>

    )
}

export default PreviewImage
