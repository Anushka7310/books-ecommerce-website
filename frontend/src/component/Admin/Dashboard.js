import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminBook } from "../../actions/bookAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);


 

  useEffect(() => {
    dispatch(getAdminBook());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };



  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full p-8">
        <MetaData title="Dashboard - Admin Panel" />
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-xl font-semibold">Total Amount</p>
            <p className="text-3xl font-semibold text-primary">₹{totalAmount}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <Link to="/admin/books">
              <p className="text-xl font-semibold">Books</p>
              <p className="text-3xl font-semibold text-primary">
                {books ? books.length : 0}
              </p>
            </Link>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <Link to="/admin/orders">
              <p className="text-xl font-semibold">Orders</p>
              <p className="text-3xl font-semibold text-primary">
                {orders ? orders.length : 0}
              </p>
            </Link>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <Link to="/admin/users">
              <p className="text-xl font-semibold">Users</p>
              <p className="text-3xl font-semibold text-primary">
                {users ? users.length : 0}
              </p>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <Line data={lineState} />
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Dashboard;
