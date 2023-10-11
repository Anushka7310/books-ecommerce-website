import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateBook,
  getBookDetails,
} from "../../actions/bookAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_BOOK_RESET } from "../../constants/bookConstants";

const UpdateBook = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, book } = useSelector((state) => state.bookDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.book);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const bookId = match.params.id;

  useEffect(() => {
    if (book && book._id !== bookId) {
      dispatch(getBookDetails(bookId));
    } else {
      setTitle(book.title);
      setDescription(book.description);
      setPrice(book.price);
      setAuthor(book.author);
      setStock(book.stock);
      setOldImages(book.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Book Updated Successfully");
      history.push("/admin/books");
      dispatch({ type: UPDATE_BOOK_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    bookId,
    book,
    updateError,
  ]);

  const updateBookSubmitHandler = (e) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      price,
      description,
      stock,
      images: [
        {
          public_id: "unique_id", // You can use any unique identifier here
          url: images,
        },
      ]
    };

    dispatch(updateBook(bookId, updatedBook));
  };

  const updateBookImagesChange = (e) => {

    setImages(e.target.value);
    setImagesPreview(e.target.value);
    // setOldImages([]);
  };

  return (
    <Fragment>
      <MetaData title="Update Book" />
      <div className="flex">
        <SideBar />
        <div className="w-full p-8">
          <form
            className="bg-white rounded-lg shadow-lg p-4"
            onSubmit={updateBookSubmitHandler}
          >
            <h1 className="text-2xl font-bold mb-4">Update Book</h1>

            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <DescriptionIcon className="text-primary" />
                <input
                  type="text"
                  placeholder="Book Name"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-100 rounded-md p-2"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <AttachMoneyIcon className="text-primary" />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="bg-gray-100 rounded-md p-2"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <DescriptionIcon className="text-primary" />
                <input
                  type="text"
                  placeholder="Author"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-gray-100 rounded-md p-2"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <DescriptionIcon className="text-primary" />
                <textarea
                  placeholder="Book Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                  className="bg-gray-100 rounded-md p-2"
                ></textarea>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <StorageIcon className="text-primary" />
                <input
                  type="number"
                  placeholder="stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                  className="bg-gray-100 rounded-md p-2"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <StorageIcon className="text-primary" />
                <textarea
                  placeholder="Image URLs (one URL per line)"
                  required
                  onChange={updateBookImagesChange}
                  value={oldImages[0]?.url}
                  className="bg-gray-100 rounded-md p-2"
                />
              </div>
            </div>

            <div className="mb-4 w-1/3">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Book Preview" />
                ))}
            </div>

            <div className="mb-4">
            <img key={imagesPreview} src={imagesPreview} alt="Book Preview" />
            </div>

            <Button
              type="submit"
              disabled={loading ? true : false}
              className="bg-primary text-white rounded-lg px-4 py-2"
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateBook;
