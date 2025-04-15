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
  const handleKeyDown = (e) => {
    if (type === 'textarea' && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <div className='flex flex-col w-full gap-1'>
      <label htmlFor={labelFor} className={`font-semibold ${labelClassName}`}>
        {title}
      </label>
      {
        isSelect ? (
          <select
            id={labelFor}
            required={isRequired}
            onChange={onChange}
            className='w-full h-10 border-[1px] border-primary rounded-lg p-2 text-primary text-lg outline-none focus:bg-[#e7ebff]'
          >
            {selectOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <>
            <textarea
              placeholder={placeholder}
              id={labelFor}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              value={value}
              required={isRequired}
              readOnly={isReadOnly}
              className={`w-full border-[1px] border-primary rounded-lg p-2 text-lg outline-none focus:bg-primary ${inputClassName} text-white resize-y`}
              rows={4} // Default rows, can be overridden by inputClassName
            />
            {alertText.length > 0 && (
              <p className='text-sm text-alertclr'>{alertText}</p>
            )}
          </>
        ) : (
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
            {alertText.length > 0 && (
              <p className='text-sm text-alertclr'>{alertText}</p>
            )}
          </>
        )
      }
    </div>
  )
}

export default FormInput