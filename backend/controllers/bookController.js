const Book = require("../models/bookModel");

//Create Product --ADMIN
exports.createBook = async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(201).json({
    success: true,
    book,
  });
};

//Get All Books
exports.getAllbooks = async (req, res) => {
  const books = await Book.find();
  res.status(200).json({
    success: true,
    books,
  });
};

//Update Books --admin
exports.updateBook = async (req, res, next) => {
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
};

//Delete Product
exports.deleteBook = async (req, res, next) => {
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
};
