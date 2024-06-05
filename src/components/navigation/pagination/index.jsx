import React from "react";

export default function Pagination(props) {
    const {currentPage, setCurrentPage, totalPages, rowsPerPage, data} = props
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage + 1;
    const lastItemIndex = Math.min(indexOfLastRow, data.length);
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;  // Do nothing if the page number is out of bounds
        }
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <div className="pagination-container">
            
            <ul className="pagination m-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        className="pagination-link"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button 
                            onClick={() => handlePageChange(number)} 
                            className={`pagination-link ${currentPage === number ? 'pagination-link-active' : ''}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        className="pagination-link"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
            <div className="text-center text-muted pagination-info">
                {pageNumbers.length !== 0 ? `${indexOfFirstRow}-${lastItemIndex} out of ${data.length}` : 'No items available'}
            </div>
        </div>
        </>
    )
}