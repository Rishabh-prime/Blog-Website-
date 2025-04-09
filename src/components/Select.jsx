import React, { useId } from 'react';

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="inline-block mb-1 pl-1 text-[15px] text-[#5E503F] font-medium"
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-[#FFF8E7] text-[#403D39] font-[Georgia,serif] outline-none focus:bg-[#F8EFD9] focus:border-[#B3925F] border border-[#D6CCC2] w-full transition duration-200 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option[0].toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);
