import React from 'react';

interface CustomInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error: string;
    isTextArea?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({type, placeholder, value, onChange, error, isTextArea = false}) => {
    return (
        <div className="my-3">
            <label className="text-xs font-bold">{placeholder}</label>
            {isTextArea ? (
                <textarea
                    placeholder={placeholder}
                    className="p-2 w-full border text-xs rounded-lg"
                    onChange={onChange}
                    rows={10}
                    value={value}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className="p-2 w-full border text-xs rounded-lg"
                    onChange={onChange}
                    value={value}
                />
            )}
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    );
};

export default CustomInput;