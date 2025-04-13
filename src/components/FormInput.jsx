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
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      
      if (type === 'textarea' || e.target.tagName.toLowerCase() === 'textarea') {
        const cursorPosition = e.target.selectionStart;
        const textBeforeCursor = e.target.value.substring(0, cursorPosition);
        const textAfterCursor = e.target.value.substring(cursorPosition);
        
        const newValue = textBeforeCursor + '\n' + textAfterCursor;
        
        if (onChange) {
          const syntheticEvent = {
            target: {
              value: newValue
            }
          };
          onChange(syntheticEvent);
          
          setTimeout(() => {
            e.target.selectionStart = cursorPosition + 1;
            e.target.selectionEnd = cursorPosition + 1;
          }, 0);
        }
      }
    }
  };

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
              onKeyDown={handleKeyDown}
              value={value}
              min={min}
              max={max}
              required={isRequired}
              readOnly={isReadOnly}
              className={`w-full h-10 border-[1px] border-primary rounded-lg p-2 text-lg outline-none focus:bg-primary ${inputClassName} text-white`}
            />
            {
              alertText.length > 0 &&
              <p className='text-sm text-alertclr'>{alertText}</p>
            }
          </>
      }
    </div>
  )
}

export default FormInput