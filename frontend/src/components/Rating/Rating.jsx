import React from "react";

const Rating = ({ rating = 3, maxRating = 5, onChange, disabled = false }) => {
  const handleChangeRating = (rating) => {
    if (disabled) return;
    if (onChange && typeof onChange === "function") onChange(rating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      let className = "icon star";
      if (i <= rating) {
        className = "icon star";
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        className = "icon star half";
      } else {
        className = "icon star outline";
      }
      stars.push(
        <div
          key={i}
          className={`rating__item ${className}`}
          onClick={() => handleChangeRating(i)}
        >
          <div className={className} />
        </div>
      );
    }
    return stars;
  };

  return <div className="rating__items">{renderStars()}</div>;
};

export default Rating;
