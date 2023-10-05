const express = require("express");
const {
  getAllbooks,
  createBook,
  updateBook,
  deleteBook,
  getBookDetails,
} = require("../controllers/bookController");

const router = express.Router();
router.route("/books").get(getAllbooks);
router.route("/book/new").post(createBook);
router
  .route("/book/:id")
  .put(updateBook)
  .delete(deleteBook)
  .get(getBookDetails);

module.exports = router;
