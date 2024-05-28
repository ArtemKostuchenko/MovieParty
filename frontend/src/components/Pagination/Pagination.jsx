import React from "react";

const Pagination = ({ page, limit, totalCount, onChangePage }) => {
  const countPages = Math.ceil(totalCount / limit);

  const handleChangePage = (ePage) => {
    if (ePage === page) return;

    if (onChangePage && typeof onChangePage === "function") {
      onChangePage(ePage);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (countPages <= 6) {
      for (let i = 1; i <= countPages; i++) {
        pages.push(
          <div
            className={`pagination__item${i === page ? " current" : ""}`}
            key={`page_${i}`}
            onClick={() => handleChangePage(i)}
          >
            {i}
          </div>
        );
      }
    } else {
      pages.push(
        <div
          className={`pagination__item${1 === page ? " current" : ""}`}
          key="page_1"
          onClick={() => handleChangePage(1)}
        >
          1
        </div>
      );

      let startPage, endPage;

      if (page <= 4) {
        startPage = 2;
        endPage = 5;
      } else if (page > countPages - 4) {
        startPage = countPages - 4;
        endPage = countPages - 1;
      } else {
        startPage = page - 1;
        endPage = page + 1;
      }

      if (startPage > 2) {
        pages.push(
          <div className="pagination__item skip" key="skip_start">
            ...
          </div>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <div
            className={`pagination__item${i === page ? " current" : ""}`}
            key={`page_${i}`}
            onClick={() => handleChangePage(i)}
          >
            {i}
          </div>
        );
      }

      if (endPage < countPages - 1) {
        pages.push(
          <div className="pagination__item skip" key="skip_end">
            ...
          </div>
        );
      }

      pages.push(
        <div
          className={`pagination__item${countPages === page ? " current" : ""}`}
          key={`page_${countPages}`}
          onClick={() => handleChangePage(countPages)}
        >
          {countPages}
        </div>
      );
    }

    return pages;
  };

  return (
    <div className="pagination__container">
      <div className="pagination">
        {page > 1 ? (
          <div
            className="pagination__action"
            onClick={() => handleChangePage(page - 1)}
          >
            <div className="icon arrow left" />
          </div>
        ) : (
          <div className="pagination__action transparent">
            <div className="icon arrow left" />
          </div>
        )}
        <div className="pagination__items">{renderPageNumbers()}</div>
        {page < countPages ? (
          <div
            className="pagination__action"
            onClick={() => handleChangePage(page + 1)}
          >
            <div className="icon arrow right" />
          </div>
        ) : (
          <div className="pagination__action transparent">
            <div className="icon arrow right" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
