import React from 'react';
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface PaginationProps {
    page: number;
    totalNumberOfPages: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = React.memo(({page, totalNumberOfPages, onPageChange}) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalNumberOfPages <= 5) {
            for (let i = 1; i <= totalNumberOfPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (page <= 3) {
                pageNumbers.push(1, 2, 3, 4, 5, '...', totalNumberOfPages - 1, totalNumberOfPages);
            } else if (page > totalNumberOfPages - 3) {
                pageNumbers.push(1, 2, '...', totalNumberOfPages - 4, totalNumberOfPages - 3, totalNumberOfPages - 2, totalNumberOfPages - 1, totalNumberOfPages);
            } else {
                pageNumbers.push(1, 2, '...', page - 1, page, page + 1, '...', totalNumberOfPages - 1, totalNumberOfPages);
            }
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center">
            <button
                className={"text-slate-400 me-3 text-sm w-6 h-6 flex items-center justify-center" + (page <= 1 ? " cursor-not-allowed text-slate-300" : "")}
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
            >
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            {renderPageNumbers().map((number, index) => (
                <button
                    key={index}
                    className={"text-slate-400 me-3 text-sm w-6 h-6 flex items-center justify-center" + (page === number ? " font-bold" : "")}
                    onClick={() => typeof number === 'number' && onPageChange(number)}
                    disabled={typeof number !== 'number'}
                >
                    {number}
                </button>
            ))}
            <button
                className={"text-slate-400 me-3 text-sm w-6 h-6 flex items-center justify-center" + (page >= totalNumberOfPages ? " cursor-not-allowed text-slate-300" : "")}
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalNumberOfPages}
            >
                <FontAwesomeIcon icon={faArrowRight}/>
            </button>
        </div>
    );
});

export default Pagination;