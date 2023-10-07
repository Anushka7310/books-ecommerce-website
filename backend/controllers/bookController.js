const Book = require("../models/bookModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create Product --ADMIN
exports.createBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(201).json({
    success: true,
    book,
  });
});

//Get All Books
exports.getAllbooks = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const bookCount = await Book.countDocuments();
  const apifeature = new ApiFeatures(Book.find(), req.query)
    .search()
    .pagination(resultPerPage);
  const books = await apifeature.query;
  res.status(200).json({
    success: true,
    books,
    bookCount,
  });
});

//Get Book Details
exports.getBookDetails = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHander("PRODUCT NOT FOUND", 404));
  }
  res.status(200).json({
    success: true,
    book,
  });
});

//Update Books --admin
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(500).json({
      success: false,
      message: "Book not found",
    });
  }
  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    book,
  });
});

//Delete Product
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(500).json({
      success: false,
      message: "Book not found",
    });
  }
  await book.deleteOne();
  res.status(200).json({
    success: true,
    message: "Book delete ",
  });
});
