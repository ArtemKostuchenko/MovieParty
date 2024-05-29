import React, { useState } from "react";

const Rating = ({ rating = 3, maxRating = 5, onChange, disabled = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleChangeRating = (rating) => {
    if (disabled) return;
    if (onChange && typeof onChange === "function") onChange(rating);
  };

  const handleMouseEnter = (rating) => {
    if (disabled) return;
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const renderStars = () => {
    const stars = [];
    const displayRating = hoverRating || rating;
    for (let i = 1; i <= maxRating; i++) {
      let className = "icon star";
      if (i <= displayRating) {
        className = "icon star";
      } else {
        className = "icon star outline";
      }
      stars.push(
        <div
          key={i}
          className={`rating__item ${className}`}
          onClick={() => handleChangeRating(i)}
          onMouseEnter={() => handleMouseEnter(i)}
        >
          <div className={className} />
        </div>
      );
    }
    return stars;
  };

  return (
    <div
      className={`rating__items${disabled ? " disabled" : ""}`}
      onMouseLeave={handleMouseLeave}
    >
      {renderStars()}
    </div>
  );
};

export default Rating;
