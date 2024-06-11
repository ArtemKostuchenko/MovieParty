import React from "react";
import VideoContentCard from "../VideoContentItems/VideoContentCard";
import { useGetFavoritesQuery } from "../../features/services/favorites/favoritesService";
import usePagination from "../../hooks/usePagination";
import { Pagination } from "../Pagination";
import useFavorite from "../../hooks/useFavorite";
import NotFound from "../NotFound/NotFound";

const FavoritesItems = ({ limit = 10 }) => {
  const { removeFavorite, isLoadingRemove } = useFavorite();
  const { page, handleChangePage } = usePagination();

  const { data, isLoading, isFetching } = useGetFavoritesQuery({
    page,
    limit,
  });

  if (isLoading || isFetching) {
    return (
      <div className="favorite__cards">
        {Array.from({ length: limit }).map((_, index) => {
          return <VideoContentCard key={`card__load_${index}`} skeleton />;
        })}
      </div>
    );
  }

  const favorites = data.favorites;

  if (!Boolean(data.totalCount)) {
    return (
      <NotFound
        title="У вас немає збереженого відеоконтенту"
        description="Перейдіть у будь-який відеоконтент і натисніть на кнопку 'В збережене', після чого воно з'явиться тут"
        splitter={false}
      />
    );
  }

  return (
    <>
      <div className="favorite__cards">
        {favorites.length < limit &&
          Array.from({ length: limit }).map((_, index) => {
            if (index <= favorites.length - 1) {
              const favorite = favorites[index];

              return (
                <div className="favorite__card" key={favorite._id}>
                  <VideoContentCard
                    {...favorite}
                    typeVideoContent={{ path: favorite.typeVideoContent }}
                  />
                  <button
                    className="button remove rounded"
                    onClick={() => {
                      removeFavorite(favorite._id);
                    }}
                    disabled={isLoadingRemove}
                  >
                    <div className="icon close" />
                  </button>
                </div>
              );
            } else {
              return (
                <div className="favorite__card" key={`fake__card-${index}`}>
                  <VideoContentCard fake />
                </div>
              );
            }
          })}
        {favorites.length >= limit &&
          favorites.map((favorite) => {
            return (
              <div className="favorite__card" key={favorite._id}>
                <VideoContentCard
                  {...favorite}
                  typeVideoContent={{ path: favorite.typeVideoContent }}
                />
                <button
                  className="button remove rounded"
                  onClick={() => {
                    removeFavorite(favorite._id);
                  }}
                  disabled={isLoadingRemove}
                >
                  <div className="icon close" />
                </button>
              </div>
            );
          })}
      </div>
      {data.totalCount > limit && (
        <div className="content__pagination">
          <Pagination
            page={page}
            limit={limit}
            totalCount={data.totalCount}
            onChangePage={(page) => handleChangePage(page)}
          />
        </div>
      )}
    </>
  );
};

export default FavoritesItems;
