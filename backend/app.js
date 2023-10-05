const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());

//Route Imports

const book = require("./routes/bookRoute");

app.use("/api/v1", book);

//Middlware for errors
app.use(errorMiddleware);
module.exports = app;
