import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="bg-white p-4 lg:p-8">
            <Typography component="h1" className="text-2xl font-semibold">
              Order #{order && order._id}
            </Typography>
            <Typography className="mt-4 text-xl">Shipping Info</Typography>
            <div className="bg-gray-100 p-4 lg:p-6 rounded-lg mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="font-semibold">Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p className="font-semibold">Phone:</p>
                  <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p className="font-semibold">Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
            </div>
            <Typography className="mt-4 text-xl">Payment</Typography>
            <div className="bg-gray-100 p-4 lg:p-6 rounded-lg mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p
                    className={`font-semibold ${
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
            </div>
            <Typography className="mt-4 text-xl">Order Status</Typography>
            <div className="bg-gray-100 p-4 lg:p-6 rounded-lg mt-2">
              <div>
                <p
                  className={`font-semibold ${
                    order.orderStatus && order.orderStatus === "Delivered"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>
            <Typography className="mt-4 text-xl">Order Items:</Typography>
            <div className="mt-2">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.book} className="flex items-center mt-2">
                    <img src={item.image} alt="Book" className="w-12 h-12" />
                    <Link to={`/book/${item.book}`} className="ml-4 text-blue-500">
                      {item.name}
                    </Link>{" "}
                    <span className="ml-4">
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
