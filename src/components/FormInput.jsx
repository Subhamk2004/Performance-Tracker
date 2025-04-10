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
    isReadOnly,
    alertText = '',
    selectOptions = [],
    min,
    max
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
                        {
                            selectOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))
                        }

                    </select> :
                    <>
                        <input
                            placeholder={placeholder}
                            id={labelFor}
                            type={type}
                            onChange={onChange}
                            value={value}
                            min={min}
                            max={max}
                            required={isRequired}
                            readOnly={isReadOnly}
                            className={`w-full h-10 border-[1px] border-primary rounded-lg p-2 text-lg outline-none focus:bg-primary ${inputClassName} text-white`}
                        />
                        {
                            alertText.length > 0 &&
                            <p className='text-sm text-alertclr'>*{alertText}</p>
                        }
                    </>
            }

        </div>
    )
}

export default FormInput