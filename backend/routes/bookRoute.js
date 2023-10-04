const express = require("express");
const {
  getAllbooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();
router.route("/books").get(getAllbooks);
router.route("/book/new").post(createBook);
router.route("/book/:id").put(updateBook).delete(deleteBook);

module.exports = router;
