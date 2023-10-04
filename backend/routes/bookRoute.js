const express = require("express");
const { getAllbooks } = require("../controllers/bookController");

const router = express.Router();
router.route("/products").get(getAllbooks);

module.exports = router;
