const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter book Name"],
  },
  author: {
    type: String,
    required: [true, "Please Enter Author Name"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Price"],
    maxLength: [8, "Price cannot exceed 8 character"],
  },
  description: {
    type: String,
    required: [true, "Please Enter about Book"],
  },
  images: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
