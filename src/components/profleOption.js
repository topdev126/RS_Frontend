import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HandleLogOut } from "./handleLogout";
import { FaBookmark, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import ListGroup from "react-bootstrap/ListGroup";
import "../../src/assect/css/custom.css";
import "react-toastify/dist/ReactToastify.css";

const ProfileOption = ({ user }) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-none gap-2" ref={dropdownRef}>
      <div className="dropdown dropdown-end relative">
        {/* Avatar button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="btn btn-sm btn-icon btn-pills btn-primary"
        >
          <img
            className="rounded-circle"
            style={{ height: "2.5rem", width: "2.5rem" }}
            src={`data:${user.contentType};base64,${btoa(
              new Uint8Array(user.avatar.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
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
                <FaUser className="mr-2" /> &nbsp;&nbsp;{user.username}
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
                onClick={() => {
                  setIsDropdownOpen(false); // Close dropdown after action
                  HandleLogOut(dispatch);
                }}
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
