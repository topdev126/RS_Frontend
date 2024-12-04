import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signoutFailed, signoutSuccess } from "../redux/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { FaBookmark, FaSignOutAlt, FaUser } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import "../../src/assect/css/custom.css";

const ProfileOption = ({ user }) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3002/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailed(data.message));
        toast.error(data.message, { autoClose: 2000 });
      } else {
        dispatch(signoutSuccess());
        toast.success("Logged out successfully", { autoClose: 2000 });
      }
    } catch (error) {
      dispatch(signoutFailed(error.message));
      toast.error(error.message, { autoClose: 2000 });
    }
    setIsDropdownOpen(false); // Close dropdown after action
  };

  return (
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end relative">
        {/* Avatar button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="btn btn-sm btn-icon btn-pills btn-primary"
        >
          <img
            className="rounded-circle"
            style={{ height: "1.8rem", width: "1.8rem" }} // Explicit size
            src={user.avatar}
            alt="profile image"
          />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <ListGroup className="dropdown-menu show position-absolute mt-2 right-0 p-2 shadow-lg rounded-md w-40 bg-white profile-dropdown">
            <ListGroup.Item className="fs-4">
              <Link
                to={"/profile"}
                onClick={() => setIsDropdownOpen(false)} // Close dropdown when navigating
                className="text-gray-700 hover:text-brand-blue flex items-center"
              >
                <FaUser className="mr-2" /> Profile
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="fs-4">
              <Link
                onClick={handleLogOut}
                className="text-gray-700 hover:text-red-500 flex items-center"
              >
                <FaSignOutAlt className="mr-2 text-red-500" /> Logout
              </Link>
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
    </div>
  );
};

export default ProfileOption;
