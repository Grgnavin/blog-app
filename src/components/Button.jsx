import React from 'react'

function Button({ 
    children,
    type = 'button',
    bgcolor = 'bg-color-600',
    textColor = 'text-white',
    className = '',
    ...props
 }) {
    return (
        <button className={`px-4 py-2 rounded-lg ${className} ${textColor} 
        ${bgcolor}`} {...props}>
            {children}
        </button>
    )
}

//set the display name
Button.displayName = 'Button'

export default Button