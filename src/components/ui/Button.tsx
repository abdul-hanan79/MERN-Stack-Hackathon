import React from 'react'
import Spinner from './Spinner'

const Button = (props: any) => {
    // console.log("props.type", props.type);
    console.log("loading", props?.loading);
    console.log("valid", props?.isValid);
    return (
        <div className="modal-buttons">
            <button
                className={`text-center bg-gradient-to-r transition-colors duration-300 from-teal-400 to-yellow-200 hover:bg-gradient-to-l hover:from-teal-400 hover:to-yellow-200 text-white font-bold py-2 px-4 rounded shadow-md ${props?.className || ''} ${!props?.isValid ? "opacity-50" : ""}`}
                type={props?.type}
                onClick={props?.onClick}
                disabled={!props?.isValid}
            >
                {!props?.loading ? <span>{props.title}</span> : <Spinner className="border-white-600" />}
                {/* {props.title} */}
            </button>

        </div>
    )
}

export default Button
