import React from "react";

const Pagination = ({ page, limit, totalCount, onChangePage }) => {
  const countPages = Math.ceil(totalCount / limit);

  const handleChangePage = (ePage) => {
    if (ePage === page) return;

    if (onChangePage && typeof onChangePage === "function") {
      onChangePage(ePage);
    }
  };

  return (
    <div className="pagination__container">
      <div className="pagination">
        <div className="pagination__action">
          <div className="icon arrow left" />
        </div>
        <div className="pagination__items">
          {countPages < 5 &&
            Array.from({ length: countPages }).map((_, index) => {
              const isSelectedPage = index + 1 === page;
              return (
                <div
                  className={`pagination__item${
                    isSelectedPage ? " current" : ""
                  }`}
                  key={`page_${index}`}
                  onClick={() => handleChangePage(index + 1)}
                >
                  {index + 1}
                </div>
              );
            })}

          {countPages > 4 &&
            Array.from({ length: countPages }).map((_, index) => {
              if (index < 5) {
                return (
                  <div className="pagination__item" key={`page_${index}`}>
                    {index + 1}
                  </div>
                );
              }
              if (index === 5) {
                return <div className="pagination__item skip">...</div>;
              }
              if (index + 1 === countPages) {
                return <div className="pagination__item">{countPages}</div>;
              }
            })}
        </div>
        <div className="pagination__action">
          <div className="icon arrow right" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
