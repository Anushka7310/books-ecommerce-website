import React, { Fragment, useRef, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=", // User-provided avatar URL
  });

  const [selectedTab, setSelectedTab] = useState("login");

  const { name, email, password, avatar } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);

    // If the user-provided avatar URL is empty, use a default avatar URL
    if (avatar.trim() === "") {
      myForm.set("avatar", "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="); // Default avatar URL
    } else {
      myForm.set("avatar", avatar);
    }

    dispatch(register(myForm));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white w-96 p-6 rounded-md shadow-lg">
              <div className="mb-4 flex justify-between items-center">
                <div className="text-2xl font-bold">Login / Register</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => switchTabs("login")}
                    className={`cursor-pointer ${selectedTab === "login" ? 'text-blue-500' : ''}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => switchTabs("register")}
                    className={`cursor-pointer ${selectedTab === "register" ? 'text-blue-500' : ''}`}
                  >
                    Register
                  </button>
                </div>
              </div>
              {selectedTab === "login" && (
                <form ref={loginTab} onSubmit={loginSubmit}>
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full p-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full p-2 rounded-md"
                    />
                  </div>
                  <Link to="/password/forgot" className="text-blue-500">
                    Forget Password?
                  </Link>
                  <button className="bg-blue-500 text-white p-2 rounded-md w-full cursor-pointer">
                    Login
                  </button>
                </form>
              )}
              {selectedTab === "register" && (
                <form
                  ref={registerTab}
                  onSubmit={registerSubmit}
                >
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="w-full p-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="w-full p-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      className="w-full p-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Avatar URL (or leave empty for default)"
                      name="avatar"
                      value={avatar}
                      onChange={(e) => setUser({ ...user, avatar: e.target.value })}
                      className="w-full p-2 rounded-md"
                    />
                  </div>
                  <button className="bg-blue-500 text-white p-2 rounded-md w-full cursor-pointer">
                    Register
                  </button>
                </form>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
