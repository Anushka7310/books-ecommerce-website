const express = require("express");
const {
  getAllbooks,
  createBook,
  updateBook,
  deleteBook,
  getBookDetails,
  createBookReview,
  getBookReviews,
  deleteReview,
} = require("../controllers/bookController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/books").get(getAllbooks);
router
  .route("/admin/book/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createBook);
router
  .route("/admin/book/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBook)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBook);

router.route("/book/:id").get(getBookDetails);

router.route("/review").put(isAuthenticatedUser, createBookReview);

router
  .route("/reviews")
  .get(getBookReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
