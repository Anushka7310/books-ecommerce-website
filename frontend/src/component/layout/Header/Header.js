import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAlert } from "react-alert";
import { getBook } from "../../../actions/bookAction";

const Header = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false); // State to manage mobile menu
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    dispatch(getBook(searchQuery));
    console.log("Searching for:", searchQuery);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }

  function account() {
    history.push("/account");
  }

  function cart() {
    history.push("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  const ProfileDropdown = () => {
    return (
      <div className="flex space-x-4">
        {user.role === "admin" && (
          <Link to="/admin/dashboard" className="text-white">
            Admin
          </Link>
        )}
        <Link to="/account" className="text-white">
          Account
        </Link>
        <Link to="/orders" className="text-white">
          Orders
        </Link>
        <button onClick={logoutUser} className="text-white">
          Logout
        </button>
      </div>
    );
  };

  return (
    <header className="bg-gray-900 text-white fixed w-full z-10 top-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BookQuestShop
        </Link>
        <div className="hidden sm:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="bg-gray-800 text-white rounded-md p-2 pr-10"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-blue-500 text-white rounded-md"
            >
              Search
            </button>
          </div>
          <Link to="/cart" className="text-white">
            <ShoppingCartIcon />
          </Link>
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <Link to="/login" className="text-white">
              Sign In
            </Link>
          )}
        </div>
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white cursor-pointer"
          >
            ☰ {/* Hamburger menu icon */}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="bg-gray-900 sm:hidden">
          <div className="py-2 space-y-2">
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <Link to="/login" className="text-white">
                Sign In
              </Link>
            )}
            <Link to="/cart" className="text-white">
              Shopping Cart
            </Link>
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="bg-gray-800 text-white rounded-md p-2 pr-10"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-blue-500 text-white rounded-md"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
