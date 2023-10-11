import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./bookReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/bookConstants";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/bookAction";
import Loader from "../layout/Loader/Loader";

const BookReviews = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.bookReviews
  );

  const [bookId, setBookId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, bookId));
  };

  const bookReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(bookId));
  };

  useEffect(() => {
    if (bookId.length === 24) {
      dispatch(getAllReviews(bookId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, bookId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "text-green-500"
          : "text-red-500";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />
      <div className="flex">
        <SideBar />
        <div className="p-4 w-full">
          <form
            className="bg-white rounded p-4 shadow-md"
            onSubmit={bookReviewsSubmitHandler}
          >
            <h1 className="text-2xl font-semibold">ALL REVIEWS</h1>
            <div className="my-3 flex items-center">
              <Star className="text-yellow-500" />
              <input
                type="text"
                placeholder="Book Id"
                required
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <Button
              id="createBookBtn"
              type="submit"
              disabled={loading || bookId === ""}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <div className="mt-4">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="bookListTable"
                autoHeight
              />
            </div>
          ) : (
            <h1 className="text-2xl font-semibold mt-4">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default BookReviews;
