import React from 'react'
import Spinner from './Spinner'

const SimpleButton = (props: any) => {
    // console.log("props.type", props.type);
    return (
        <div className="modal-buttons">
            {!props.loading ? <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md`}
                onClick={props.onClick}

            >
                {props.title}
            </button> : <button
                className={`bg-white-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md ${props?.className}`}
            >
                <Spinner />
            </button>}
        </div>
    )
}

export default SimpleButton
