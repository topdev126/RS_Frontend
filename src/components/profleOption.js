import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signoutFailed, signoutSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { FaBookmark, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import ListGroup from "react-bootstrap/ListGroup";
import "../../src/assect/css/custom.css";
import "react-toastify/dist/ReactToastify.css";

const ProfileOption = ({ user }) => {
  console.log("user", user);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogOut = async () => {
    setIsDropdownOpen(false); // Close dropdown after action
    try {
      const res = await fetch("http://127.0.0.1:3002/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailed(data.message));
        toast.error(data.message);
      } else {
        dispatch(signoutSuccess());
        toast.success("successfully SignOut");
      }
    } catch (error) {
      dispatch(signoutFailed(error.message));
      toast.error(error.message);
    }
  };
  return (
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end relative">
        {/* Avatar button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="btn btn-sm btn-icon btn-pills btn-primary"
        >
          {/* <img
            className="rounded-circle"
            style={{ height: "3rem", width: "3rem" }} // Explicit size
            // src={user.avatar.data}
            src={`data:${user.contentType};base64,${btoa(
              String.fromCharCode(...new Uint8Array(user.avatar.data))
            )}`}
            alt="profile image"
          /> */}
        <img
          className="rounded-circle"
          style={{ height: "3rem", width: "3rem" }}
          src={`data:${user.contentType};base64,${btoa(
            new Uint8Array(user.avatar.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
          )}`}
          alt="profile image"
        />       
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <ListGroup className="dropdown-menu show position-absolute mt-2 right-0 p-2 shadow-lg rounded-md w-40 bg-white profile-dropdown">
            <ListGroup.Item className="fs-6">
              <Link
                to={"/profile"}
                onClick={() => setIsDropdownOpen(false)} // Close dropdown when navigating
                className="text-gray-700 hover:text-brand-blue flex items-center"
                style={{ color: "black" }}
              >
                <FaUser className="mr-2" /> &nbsp;&nbsp;Profile
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="fs-6">
              <Link
                to={"/favorite"}
                onClick={() => setIsDropdownOpen(false)} // Close dropdown when navigating
                className="text-gray-700 hover:text-red-500 flex items-center"
                style={{ color: "black" }}
              >
                <MdFavoriteBorder className="mr-2 text-red-500" />{" "}
                &nbsp;&nbsp;Favorite
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="fs-6">
              <Link
                onClick={handleLogOut}
                className="text-gray-700 hover:text-red-500 flex items-center"
                style={{ color: "black" }}
              >
                <FaSignOutAlt className="mr-2 text-red-500" />{" "}
                &nbsp;&nbsp;Logout
              </Link>
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
    </div>
  );
};

export default ProfileOption;
