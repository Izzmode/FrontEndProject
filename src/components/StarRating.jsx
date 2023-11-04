import React from 'react';

const StarRating = ({ rating }) => {
  // Calculate the percentage of the star to fill
  const starFillPercentage = (rating / 5) * 100;

  return (
    <div className="star-rating">
      <div className="star-rating-filled" style={{ background: `linear-gradient(to right, #FFD700 ${starFillPercentage}%, transparent ${starFillPercentage}%)` }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.9282L14.434 8.53504L20.2682 9.29314L16.9 13.1122L17.6579 19.0722L12 16.8602L6.34206 19.0722L7.09995 13.1122L3.73177 9.29314L9.56602 8.53504L12 2.9282V2.9282Z"
            fill="#FFD700"
          />
        </svg>
      </div>
    </div>
  );
};

export default StarRating;
