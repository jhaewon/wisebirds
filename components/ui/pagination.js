import React from "react";
import classes from "./campaignGrid.module.css";

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  );

  return (
    <div className={classes.pagination}>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => onPageChange(pageNumber)}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
