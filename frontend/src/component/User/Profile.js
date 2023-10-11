import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer mx-auto mt-8">
            <div className="bg-white rounded-lg shadow-lg p-4 md:w-3/4 mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{user.name}'s Profile</h1>
                <Link to="/me/update" className="text-blue-500 hover:underline">
                  Edit Profile
                </Link>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="flex-none md:w-1/4 text-center">
                  <img
                    src={user.avatar.url}
                    alt={user.name}
                    className="w-32 h-32 rounded-full mx-auto"
                  />
                </div>
                <div className="flex-grow md:w-3/4">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Full Name</h4>
                    <p>{user.name}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Email</h4>
                    <p>{user.email}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Joined On</h4>
                    <p>{String(user.createdAt).substr(0, 10)}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Link
                  to="/orders"
                  className="text-blue-500 hover:underline block"
                >
                  My Orders
                </Link>
                <Link
                  to="/password/update"
                  className="text-blue-500 hover:underline block"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
