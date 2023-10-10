const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

//Route Imports

const book = require("./routes/bookRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", book);
app.use("/api/v1", user);

//Middlware for errors
app.use(errorMiddleware);
module.exports = app;
