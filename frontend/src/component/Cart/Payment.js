import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    // Simulate a delay as if the payment is being processed
    setTimeout(() => {
      alert.success("Payment is successful!");
      payBtn.current.disabled = false;

      order.paymentInfo = {
        id: "mock-payment-id",
        status: "succeeded",
      };

      dispatch(createOrder(order));

      history.push("/success");
    }, 2000);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer bg-white p-8 shadow-lg rounded-md">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <VpnKeyIcon />
              <input
                type="password"
                placeholder="Enter Payment Key"
                className="paymentInput bg-gray-100 w-full p-2 rounded-md"
                required
              />
            </div>
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn bg-blue-500 text-white rounded-md p-2 cursor-pointer"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
