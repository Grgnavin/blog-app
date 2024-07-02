import React, { useId } from 'react';

// Name the function
const Select = React.forwardRef(function Select({
    options = [],
    className = '',
    label,
    ...props
}, ref) {
    const id = useId();

    return (
        <div className='w-full'>
        {label && <label htmlFor={id} className=''>{label}</label>}
        <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
            ))}
        </select>
        </div>
    );
});

// Export the named function
export default Select;
