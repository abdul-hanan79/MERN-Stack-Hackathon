import React from 'react'

const InputBlock = (props: any) => {
    console.log("props.error", props.error);
    console.log("props.touched", props.touched);
    return (
        <div className="input-block">
            <label htmlFor="description" className="block text-lg font-medium text-slate-700F">
                {props.label}
            </label>
            <input
                type={props.type}
                autoComplete="off"
                name={props.name}
                id={props.id}
                // className="rounded-lg shadow-md p-1 border rounded w-full h-20 px-3 text-gray-700"
                className={`rounded-lg focus:ring-2 focus:ring-yellow-400  shadow-md p-3 focus:outline-4  outline-none ${props?.className || null}`}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.handleBlur}
            />

            {props.error && props.touched ? (
                <p className="form-error text-rose-700">{props.error}</p>
            ) : null}
        </div>
    )
}

export default InputBlock
