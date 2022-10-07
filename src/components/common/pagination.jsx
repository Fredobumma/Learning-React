import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pages = [];
  const pageCount = Math.ceil(itemsCount / pageSize);
  for (let i = 1; i <= pageCount; i++) pages.push(i);

  if (pageCount <= 1) return null;
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map((page) => (
          <li className="page-item" key={page}>
            <span
              className={`page-link ${
                currentPage === page ? "active" : "text-dark"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;
