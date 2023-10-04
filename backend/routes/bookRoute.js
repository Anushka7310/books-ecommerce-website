const express = require("express");
const { getAllbooks } = require("../controllers/bookController");

const router = express.Router();
router.route("/books").get(getAllbooks);

module.exports = router;
