import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Shipping Info</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p className="font-semibold">Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p className="font-semibold">Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Cart Items:</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.book} className="flex items-center space-x-2">
                  <img
                    src={item.image}
                    alt="Book"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <a
                      href={`/book/${item.book}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {item.name}
                    </a>
                    <p>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="font-semibold">Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <p className="text-xl font-semibold">Total:</p>
              <span className="text-xl">₹{totalPrice}</span>
            </div>
            <button
              onClick={proceedToPayment}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
