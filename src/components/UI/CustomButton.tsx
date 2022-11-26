import React from 'react'
interface CustomButtonProps {
    styles?: string
    children: React.ReactNode
    onClick?: () => void
}
const CustomButton: React.FC<CustomButtonProps> = ({
    styles,
    children,
    onClick,
}) => {
    return (
        <button
            className={`flex items-center justify-center rounded-lg font-bold ${styles} transition delay-100 ease-out hover:scale-110`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default CustomButton
