import React from 'react'

const Button = (props: any) => {
    // console.log("props.type", props.type);
    return (
        <div className="modal-buttons">
            <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md ${props?.className}`}
                type={props?.type}
                onClick={props?.onClick}
                disabled={props.isValid}
            >
                {props.title}
            </button>
        </div>
    )
}

export default Button
