import React from "react";
import { motion } from "framer-motion";
import { useGetFavoriteByVideoContentIdQuery } from "../../features/services/favorites/favoritesService";
import useFavorite from "../../hooks/useFavorite";

const Favorite = ({ videoContentId }) => {
  const { addFavorite, isLoadingAdd, removeFavorite, isLoadingRemove } =
    useFavorite();
  const { data: favoriteId, isLoading } =
    useGetFavoriteByVideoContentIdQuery(videoContentId);

  if (isLoading) {
    return (
      <button type="button" className="button transparent icon fill g8">
        <div className="icon favorite" />В збережене
      </button>
    );
  }

  const handleFavorite = () => {
    if (favoriteId) {
      removeFavorite(videoContentId);
    } else {
      addFavorite(videoContentId);
    }
  };

  return (
    <button
      type="button"
      className="button transparent icon fill g8"
      onClick={handleFavorite}
      disabled={isLoadingAdd || isLoadingRemove}
    >
      <motion.div
        className={`icon favorite${favoriteId ? " fill" : ""}`}
        animate={{ scale: favoriteId ? 1.2 : 1.2 }}
        transition={{ duration: 0.3 }}
      />
      В збережене
    </button>
  );
};

export default Favorite;
