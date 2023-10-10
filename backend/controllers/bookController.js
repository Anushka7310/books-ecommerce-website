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

//Create New Review or Update the review

exports.createBookReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, bookId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const book = await Book.findById(bookId);
  const isReviewed = book.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    book.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    book.reviews.push(review);
    book.numOfReviews = book.reviews.length;
  }

  let avg = 0;
  book.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  book.ratings = avg / book.reviews.length;

  await book.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get all review of a single book
exports.getBookReviews = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.query.id);

  if (!book) {
    return next(new ErrorHander("Book not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: book.reviews,
  });
});

//Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.query.bookId);

  if (!book) {
    return next(new ErrorHander("Book not found", 404));
  }

  const reviews = book.reviews.filter((rev) => {
    return rev._id.toString() === req.query.id.toString();
  });

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;
  await Book.findByIdAndUpdate(
    req.query.bookId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
