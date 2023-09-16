import React from 'react'

const InputBlock = (props: any) => {
    return (
        <div className="input-block">
            <label htmlFor="description" className="block text-md font-medium text-slate-700F">
                {props.label}
            </label>
            <input
                type={props.type}
                autoComplete="off"
                name={props.name}
                id={props.id}
                // className="rounded-lg shadow-md p-1 border rounded w-full h-20 px-3 text-gray-700"
                className={`rounded-lg shadow-md p-1 ${props?.className}`}
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
