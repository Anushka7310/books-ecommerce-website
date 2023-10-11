import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getBookDetails,
  newReview,
} from "../../actions/bookAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/bookConstants";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const BookDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { book, loading, error } = useSelector(
    (state) => state.bookDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: book?.ratings || 0,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (book.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
    history.push("/cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("bookId", match.params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getBookDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading || !book ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${book?.title} -- ECOMMERCE`} />
          <div className=" mx-auto py-4 px-4 sm:px-8 mt-4 md:flex md:justify-between items-start w-screen">
            <div className="w-full md:w-2/6 md:px-10">
              <Carousel>
                {book.images &&
                  book.images.map((item, i) => (
                    <img
                      className="w-full rounded-lg"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="w-2/3 md:w-2/6 mt-4">
              <h2 className="text-2xl font-semibold">{book.name}</h2>
              <p className="text-gray-600 text-sm">Book # {book._id}</p>
              <div className="flex items-center mt-2">
                <Rating {...options} />
                <span className="ml-2 text-gray-600 text-sm">
                  ({book.numOfReviews} Reviews)
                </span>
              </div>
              <div className="mt-4">
                <h1 className="text-xl font-semibold">₹{book.price}</h1>
                <div className="flex items-center mt-4">
                  <div className="flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      className="px-2 py-1 bg-gray-200 rounded-full"
                    >
                      -
                    </button>
                    <input
                      readOnly
                      type="number"
                      value={quantity}
                      className="mx-2 w-10 text-center"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="px-2 py-1 bg-gray-200 rounded-full"
                    >
                      +
                    </button>
                  </div>
                  <button
                    disabled={book.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="mt-2 text-sm">
                  Status:
                  <span
                    className={`ml-2 font-semibold ${
                      book.Stock < 1 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {book.Stock < 1 ? "Out of Stock" : "In Stock"}
                  </span>
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Description:</h3>
                <p className="text-gray-600 text-sm">{book.description}</p>
              </div>
              <button
                onClick={submitReviewToggle}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
              >
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-4 px-4">
            REVIEWS
          </h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea mt-2 p-2 border border-gray-300 rounded-lg w-full text-sm"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {book.reviews && book.reviews[0] ? (
            <div className="px-4">
              {book.reviews &&
                book.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews text-xl font-semibold mt-4 px-4">
              No Reviews Yet
            </p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default BookDetails;
