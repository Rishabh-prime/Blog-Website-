import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    error = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full font-[Georgia,serif]">
            {label && (
                <label
                    htmlFor={id}
                    className="inline-block mb-1 pl-1 text-[15px] text-[#5E503F] font-medium"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                ref={ref}
                className={`
                    px-4 py-2 w-full rounded-md
                    bg-[#FAF3DD] text-[#403D39] placeholder:text-[#9B877F]
                    border ${error ? 'border-[#B85C38]' : 'border-[#C2B280]'} 
                    focus:outline-none focus:ring-2 focus:ring-[#A68A64]
                    duration-200 shadow-sm
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="text-[#B85C38] text-sm mt-1 pl-1 italic">
                    {error}
                </p>
            )}
        </div>
    );
});

export default Input;
