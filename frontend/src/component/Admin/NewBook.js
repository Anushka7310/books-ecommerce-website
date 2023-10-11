import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBook } from "../../actions/bookAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_BOOK_RESET } from "../../constants/bookConstants";

const NewBook = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newBook);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Book Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_BOOK_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createBookSubmitHandler = (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      price,
      description,
      stock,
      images: [
        {
          public_id: "unique_id", // You can use any unique identifier here
          url: imageURL,
        },
      ],
    };

    dispatch(createBook(newBook));
  };

  return (
    <Fragment>
      <MetaData title="Create Book" />
      <div className="flex">
        <SideBar />
        <div className="w-full p-8">
          <form
            className="bg-white rounded-lg shadow-lg p-4"
            onSubmit={createBookSubmitHandler}
          >
            <h1 className="text-2xl font-bold mb-4">Create Book</h1>

            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <AttachMoneyIcon className="text-primary" />
                <input
                  type="text"
                  placeholder="Book Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  type="text"
                  placeholder="Description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                <StorageIcon className="text-primary" />
                <input
                  type="number"
                  placeholder="Stock"
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
                <input
                  type="text"
                  placeholder="Image URL"
                  required
                  onChange={(e) => setImageURL(e.target.value)}
                  value={imageURL}
                  className="bg-gray-100 rounded-md p-2"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading ? true : false}
              className="bg-primary text-white rounded-lg px-4 py-2"
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewBook;
