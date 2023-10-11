const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true },
        phoneNo: { type: Number, required: true },
    },
    orderItems: [
        {
            title: { type: String, required: true },
            price: { type: String, required: true },
            quantity: { type: String, required: true },
            image: { type: String, required: true },
            book: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    taxPrince: {
        type: Number,
        default: 0,
        required: true,
    },
    shippingPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    orderStatus: {
        type: String,
        default: "Processing",
        required: true,
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
    },
});

module.exports = mongoose.model("Order", orderSchema)
