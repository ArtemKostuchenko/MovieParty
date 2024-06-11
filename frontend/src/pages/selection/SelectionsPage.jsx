import React from "react";
import "./style.page.scss";
import usePagination from "../../hooks/usePagination";
import { useGetSelectionsQuery } from "../../features/services/selections/selectionsService";
import { Loader, NotFound, Pagination } from "../../components";
import useFill from "../../hooks/useFill";
import { Link } from "react-router-dom";

const SelectionsPage = ({ limit = 18 }) => {
  const { page, handleChangePage } = usePagination();
  useFill();

  const { data, isLoading } = useGetSelectionsQuery({
    limit,
    page,
  });

  if (isLoading) {
    return <Loader fixed />;
  }

  const { totalCount, selections } = data;

  if (!Boolean(totalCount)) {
    return (
      <NotFound
        title="Жодної підбірки немає"
        description="Зачекайте, поки адміністратор додасть деякі підбірки"
      />
    );
  }

  return (
    <div className="container cnt-mn full" style={{ height: "100%" }}>
      <div className="container" style={{ height: "100%" }}>
        <div className="wrapper">
          <div className="selections-page">
            <div className="selections-page-title">
              Підбірки фільмів, серіалів, мультфільмів та мультсеріалів
            </div>
            <div className="selections-page-items">
              {selections.map((selection) => {
                const { _id, name, previewURL } = selection;
                return (
                  <Link
                    to={`/selections/${_id}`}
                    className="selection-page-item"
                    key={_id}
                  >
                    <div className="selection-page-item-title">{name}</div>
                    <div className="selection-page-item-filter"></div>
                    <div className="selection-page-item-preview">
                      <img
                        src={`${
                          import.meta.env.VITE_BACK_HOST
                        }/static/files/images/selections/${previewURL}`}
                        alt={name}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
            {selections.length > limit && (
              <Pagination
                page={page}
                limit={limit}
                totalCount={totalVideoContents}
                onChangePage={(page) => handleChangePage(page)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default SelectionsPage;
