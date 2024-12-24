import React from 'react'

function FormInput({
    title,
    labelFor,
    placeholder,
    type,
    isRequired = false,
    isSelect = false,
    value,
    onChange,
    inputClassName,
    labelClassName,
    isReadOnly
}) {
    return (
        <div className='flex flex-col w-full gap-1'>
            <label htmlFor={labelFor} className={` font-semibold ${labelClassName}`}>
                {title}
            </label>
            {
                isSelect ?
                    <select
                        id={labelFor}
                        required={isRequired}
                        onChange={onChange}
                        className='w-full h-10 border-[1px] border-primary rounded-lg p-2 text-primary text-lg outline-none focus:bg-[#e7ebff]'
                    >
                        <option value='Academics'>Academics</option>
                        <option value='Programming'>Programming</option>
                        <option value='Research'>Research</option>
                        <option value='Office'>Office</option>
                        
                    </select> :
                    <input
                        placeholder={placeholder}
                        id={labelFor}
                        type={type}
                        onChange={onChange}
                        value={value}
                        required={isRequired}
                        readOnly={isReadOnly}
                        className={`w-full h-10 border-[1px] border-primary rounded-lg p-2 text-lg outline-none focus:bg-primary ${inputClassName} text-white`}
                    />
            }

        </div>
    )
}

export default FormInput