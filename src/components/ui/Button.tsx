import React from 'react'
import Spinner from './Spinner'

const Button = (props: any) => {
    // console.log("props.type", props.type);
    console.log("loading", props?.loading);
    console.log("valid", props?.isValid);
    return (
        <div className="modal-buttons">
            {!props.loading ? <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md ${!props?.isValid ? "bg-blue-100" : ""}`}
                type={props?.type}
                onClick={props.onClick}
                disabled={!props?.isValid}
            >
                {props.title}
            </button> : <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md ${!props?.isValid ? "bg-blue-100" : ""}`}
            >
                <Spinner className="border-white-600" />
            </button>}
        </div>
    )
}

export default Button
