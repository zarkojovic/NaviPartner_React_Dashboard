import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

interface DropdownMenuProps {
    onDelete: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({onDelete}) => {
    return (
        <div className="absolute right-0 mt-2 w-48 z-50 bg-white border rounded shadow-lg">
            <button
                className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                onClick={onDelete}
            >
                <FontAwesomeIcon icon={faTrash} className="mr-2 text-xs"/>
                Delete Blog
            </button>
        </div>
    );
};

export default DropdownMenu;