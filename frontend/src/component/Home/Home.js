import MetaData from "../layout/MetaData";
import { clearErrors, getBook } from "../../actions/bookAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";

import React, { useEffect } from 'react';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, books } = useSelector((state) => state.books);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBook());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="BookQuestShop" />
          <div className="bg-gray-100 py-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome to BookQuestShop</h2>
              <p className="text-gray-600">Discover a wide range of books for your reading pleasure.</p>
            </div>
          </div>
          <div className="container" id="container">
            <div className="bg-white mt-8">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {books &&
                    books.map((book) => (
                      <Link to={`/book/${book._id}`} className="group" key={book._id}>
                        <div className="aspect-h-1 aspect-w-1 w-full h-[400px] overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                          <img
                            src={book.images[0].url}
                            alt={book.title}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">{book.title}</h3>
                        <div className="mt-3">
                          <Rating value={book.ratings} readOnly precision={0.5} />
                        </div>
                        <p className="mt-1 text-lg font-medium text-gray-900">{`₹${book.price}`}</p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
