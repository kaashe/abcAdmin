import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="join w-full flex justify-center py-2">
      {[...Array(totalPages)].map((_, index) => (
        <input
          key={index}
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label={index + 1}
          checked={currentPage === index + 1} 
          onChange={() => onPageChange(index + 1)}
        />
      ))}
    </div>
  );
};


export default Pagination;
