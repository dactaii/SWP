import React from "react";


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxDisplayed = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayed / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayed - 1);

    if (endPage - startPage < maxDisplayed - 1) {
      startPage = Math.max(1, endPage - maxDisplayed + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pagination-wrapper">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
