/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    return (
        <button
            type={type}
            className={twMerge(`text-black border border-transparent rounded-full bg-green-500 w-full px-4 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-75 transition`, className
            )}
            disabled={disabled}
            {...props}
            ref={ref}
        >
            {children}
        </button>
    )
})

Button.displayName = 'Button'

export default Button;