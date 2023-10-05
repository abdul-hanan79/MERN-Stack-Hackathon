import React from 'react'
import Spinner from './Spinner'

const SimpleButton = (props: any) => {
    // console.log("props.type", props.type);
    return (
        <div className="modal-buttons">
            <button
                className={`bg-gradient-to-r transition-colors duration-300 from-teal-400 to-yellow-200 hover:bg-gradient-to-l hover:from-teal-400 hover:to-yellow-200 text-white font-bold py-2 px-4 rounded shadow-md ${props?.className || ''}`}
                onClick={props?.onClick}
            >
                {!props?.loading ? <span> {props.title} </span> : <Spinner />}
            </button>
        </div>
    )
}

export default SimpleButton
