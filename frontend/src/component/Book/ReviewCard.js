import React from "react";
import profilePng from "../../images/Profile.png";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="flex items-center p-4 mb-4 border border-gray-300 rounded-lg">
      <img
        src={profilePng}
        alt="User"
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <p className="text-lg font-semibold">{review.name}</p>
        <div className="flex items-center space-x-1">
        <Rating {...options} />
        </div>
        <p className="text-gray-600 mt-2">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
