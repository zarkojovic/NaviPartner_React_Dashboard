import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

interface CustomButtonProps {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    icon?: IconDefinition;
}

const CustomButton: React.FC<CustomButtonProps> = ({text, onClick, className = "", icon}) => {
    return (
        <button
            className={`p-3 ${className}`}
            onClick={onClick}
        >
            {icon && <FontAwesomeIcon icon={icon} className="mr-2"/>}
            {text}
        </button>
    );
};

export default CustomButton;