import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-[#D2B48C]", // Light caramel (Tan)
    textColor = "text-[#4B3621]", // Deep brown
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} hover:bg-[#c5a880] transition-colors duration-200 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
