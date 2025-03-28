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

    const getVisiblePages = (currentPage, totalPages) => {
        const visiblePages = [];
        if (totalPages <= 5) {
            // Show all pages if total pages are 5 or less
            for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
        } else {
            // Show the first, last, current, and neighbors
            if (currentPage > 2) visiblePages.push(1); // First page
            if (currentPage > 3) visiblePages.push('...'); // Ellipsis before current
    
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            for (let i = startPage; i <= endPage; i++) visiblePages.push(i);
    
            if (currentPage < totalPages - 2) visiblePages.push('...'); // Ellipsis after current
            if (currentPage < totalPages - 1) visiblePages.push(totalPages); // Last page
        }
        return visiblePages;
    };
    
    const visiblePages = getVisiblePages(currentPage, totalPages);
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
                {visiblePages.map((number, index) => (
                    <li key={index} className="page-item">
                        {number === '...' ? (
                            <span className="pagination-ellipsis">...</span>
                        ) : (
                            <button
                                onClick={() => handlePageChange(number)}
                                className={`pagination-link ${
                                    currentPage === number ? 'pagination-link-active' : ''
                                }`}
                            >
                                {number}
                            </button>
                        )}
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
                {pageNumbers.length !== 0 ? `${indexOfFirstRow}-${lastItemIndex} outs of ${data.length}` : 'No items available'}
            </div>
        </div>
        </>
    )
}