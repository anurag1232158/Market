"use client";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

function Pagination({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center my-3 pb-4">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              className="btn btn-primary"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              Previous
            </button>
          </li>
          <li className="page-item mx-3">
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
          </li>
          <li className="page-item">
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
