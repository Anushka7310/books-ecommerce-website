const express = require("express");
const {
  getAllbooks,
  createBook,
  updateBook,
  deleteBook,
  getBookDetails,
} = require("../controllers/bookController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/books").get(getAllbooks);
router
  .route("/book/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createBook);
router
  .route("/book/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBook)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBook)
  .get(getBookDetails);

module.exports = router;
