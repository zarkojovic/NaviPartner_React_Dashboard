import React, {useEffect, useRef} from 'react';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const CustomModal: React.FC<CustomModalProps> = ({isOpen, onClose, onConfirm, title, message}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-100"
             style={{zIndex: 1000}}>
            <div ref={modalRef} className="bg-white p-5 rounded-xl shadow-lg">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <p className="mb-4 text-xs">{message}</p>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mr-2 text-xs font-bold hover:bg-gray-400 transition duration-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-red-600  transition duration-300"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;