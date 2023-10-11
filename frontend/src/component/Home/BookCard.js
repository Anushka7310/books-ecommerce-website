import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const BookCard = ({ book }) => {
  const options = {
    value: book.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="bookCard" to={`/book/${book._id}`}>
      <img src={book.images[0].url} alt={book.title} />
      <p>{book.title}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="bookCardSpan">
          {" "}
          ({book.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${book.price}`}</span>
    </Link>
  );
};

export default BookCard;
