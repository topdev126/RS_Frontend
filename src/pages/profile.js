import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import bg3 from "../assect/images/bg/03.jpg";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { HandleLogOut } from "../components/handleLogout.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userUpdateSuccess, signinFailed } from "../redux/user/userSlice.js";
import { handleRemoveElement } from "../components/helper.js"
import { FaTrash } from "react-icons/fa";
import Select from "react-select";

export default function AdminPage() {
  const apiUrl = process.env.REACT_APP_SERVER_URL;

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("profile");
  const [loading1, setLoading1] = useState(false); // Track loading state
  const [loading2, setLoading2] = useState(false); // Track loading state
  const [loading3, setLoading3] = useState(false); // Track loading state
  const [loading4, setLoading4] = useState(false); // Track loading state
  const [message, setMessage] = useState(""); // Feedback message for the user
  const [salesPersons, setSalesPersons] = useState([]);
  const [dbSalesPersons, setDbSalesPersons] = useState([]);

  const [users, setUsers] = useState([]);

  const [fullName, setFullName] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [selectedImage, setSelectedImage] = useState(null); // State to hold the loaded image
  const token = localStorage.getItem("access_token");
  const handleFileChange = async (event) => {
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("id", currentUser._id);
      const response = await fetch(`${apiUrl}/api/users/avatarUpload`, {
        // Replace with your server endpoint
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
          // "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok === false) {
        toast.error(data.message);
        HandleLogOut(dispatch);
      } else {
        const updatedUser = {
          ...currentUser,
          avatar: data.buffer,
          contentType: data.type,
        };
        dispatch(userUpdateSuccess(updatedUser));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleUpload = () => {
    document.getElementById("fileInput").click();
  };
  const getAllUser = (e) => {
    let flt = "";
    if (e) {
      flt = e.target.value;
      e.preventDefault();
    }

    const payload = {
      flt: flt,
    };

    fetch(`${apiUrl}/api/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          // toast.error(`HTTP error! status: ${response.status}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setSalesPersons(data.users.filter((user) => user.role === 2));
      })
      .catch((error) => {
        toast.error(error);
        console.log("Error fetching data:", error);
      });
  };
  const getSalePerson = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/getSalesPerson`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add an Authorization token if required
          // 'Authorization': 'Bearer your-token-here'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Assuming the API returns JSON
      setDbSalesPersons(data);
      console.log("Sales Persons:", salesPersons);
    } catch (error) {
      console.error("Error fetching sales persons:", error);
      return [];
    }
  };
  useEffect(() => {
    getAllUser();
    getSalePerson();
  }, []);
  const profileSave = (e) => {
    e.preventDefault();
    const payload = {
      username: fullName,
      email: email,
      id: currentUser._id,
    };

    fetch(`${apiUrl}/api/admin/profileSave`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedUser = {
          ...currentUser,
          username: fullName,
          email: email,
        };
        dispatch(userUpdateSuccess(updatedUser));
        toast.info("Data modified.");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const pwdChange = (e) => {
    e.preventDefault();
    const payload = {
      old_pwd: pwd,
      new_pwd: newPwd,
      confirm_pwd: confirmPwd,
      id: currentUser._id,
    };

    fetch(`${apiUrl}/api/admin/pwdChange`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status === 200) toast.success("Successfully Updated Password")
        else if (response.status === 422) toast.warning("Not Matched Password")
        else if (response.status === 401) toast.warning("Not exact Old password")
        else if (response.status === 500) toast.error("Internal Server Error")})
      .catch((error) => {toast.error("Failed Updating Password")});
  };
  const roleChange = (id, event) => {
    const payload = {
      id: id,
      role: event.target.value,
    };

    fetch(`${apiUrl}/api/admin/roleChange`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {});
  };
  // Function to handle the reload database logic
  const onReload = async (dbName) => {
    if (dbName == "comm_rent") setLoading1(true); // Start loading indicator
    else if (dbName == "comm_sale")
      setLoading2(true); // Start loading indicator
    else if (dbName == "resi_rent")
      setLoading3(true); // Start loading indicator
    else if (dbName == "resi_sale") setLoading4(true); // Start loading indicator
    setMessage(""); // Clear previous messages
    try {
      const response = await fetch(`${apiUrl}/api/admin/upload_${dbName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "reload", database: dbName }), // Include relevant payload if needed
      });

      if (!response.ok) {
        throw new Error(`Failed to reload database: ${response.statusText}`);
      }

      const result = await response.json();
      setMessage(result.message || "Database reloaded successfully!");
    } catch (error) {
      setMessage(error.message || "An error occurred during reload.");
    } finally {
      if (dbName == "comm_rent") setLoading1(false); // Start loading indicator
      else if (dbName == "comm_sale")
        setLoading2(false); // Start loading indicator
      else if (dbName == "resi_rent")
        setLoading3(false); // Start loading indicator
      else if (dbName == "resi_sale") setLoading4(false); // Start loading indicator
    }
  };
  const removeUser = async (id) => {
    fetch(`${apiUrl}/api/users/delete/${id}`, {
      method: "DELETE", // Specify the HTTP method
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete user.");
        }
        return response.json();
      })
      .then((data) => {
        // Update state to remove the deleted user
        setUsers(users.filter((item) => item._id !== id));
        toast.success(data); // Assuming the server sends a success message
      })
      .catch((error) => {
        // Display an error toast
        toast.error(
          error.message || "An error occurred while deleting the user."
        );
      });
  };

  const items = [
    { id: 0, label: "Commercial Rent" },
    { id: 1, label: "Commercial Sale" },
    { id: 2, label: "Residential Rent" },
    { id: 3, label: "Residential Sale" },
  ];

  const salesHandleChange = (selectedOption, dbInd) => {
    const payload = {
      dbIndex: dbInd,
      userID: salesPersons[selectedOption.value]._id,
      userName: salesPersons[selectedOption.value].username,
    };

    fetch(`${apiUrl}/api/admin/changeSalesPerson`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {});
  };
  // Function to render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <div className="container">
            {/* Search Input */}
            <div className="row mb-4">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Search by User Name"
                  className="form-control shadow-sm"
                  onChange={getAllUser}
                />
              </div>
            </div>

            {/* User Role Management Table */}
            <form id="userRole">
              <div className="table-responsive shadow-lg rounded px-1 py-1">
                <table className="table table-striped table-hover align-middle">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Email</th>
                      <th>Created Date</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.email}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            {/* Role Selector */}
                            <select
                              id={user._id}
                              defaultValue={user.role}
                              onChange={(event) => roleChange(user._id, event)}
                              className="form-select shadow-sm me-2"
                            >
                              <option value={-1}>No Permission</option>
                              <option value={0}>Client</option>
                              <option value={2}>Salesperson</option>
                              <option value={5}>Admin</option>
                            </select>
                            {/* Remove Button */}
                            <button
                              type="button"
                              className="btn btn-danger btn-sm shadow-sm"
                              onClick={() => handleRemoveElement(user._id, removeUser, "User")}
                              title="Remove User"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        );
      case "profile":
        return (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body p-4">
                  <h3 className="text-center mb-4 fw-bold text-primary">
                    Update Profile
                  </h3>
                  <form onSubmit={profileSave}>
                    {/* Name and Email */}
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="name"
                          className="form-label fw-semibold"
                        >
                          Your Name
                        </label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="form-control shadow-sm"
                          placeholder="Enter your name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="email"
                          className="form-label fw-semibold"
                        >
                          Your Email
                        </label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="form-control shadow-sm"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Phone and Avatar */}
                    <div className="row g-3 align-items-center mb-4">
                      <div className="col-md-6">
                        <label
                          htmlFor="phone"
                          className="form-label fw-semibold"
                        >
                          Your Phone
                        </label>
                        <input
                          name="phone"
                          id="phone"
                          type="tel"
                          className="form-control shadow-sm"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 text-center">
                        <label
                          onClick={handleUpload}
                          className="d-block mb-3 text-primary fw-bold cursor-pointer"
                        >
                          Edit Avatar
                        </label>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          className="d-none"
                          onChange={handleFileChange}
                        />
                        <img
                          className="rounded-circle border shadow-sm"
                          style={{ height: "100px", width: "100px" }}
                          src={`data:${currentUser.contentType};base64,${btoa(
                            new Uint8Array(currentUser.avatar.data).reduce(
                              (data, byte) => data + String.fromCharCode(byte),
                              ""
                            )
                          )}`}
                          alt="Profile Avatar"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid">
                      <button
                        type="submit"
                        id="submit"
                        name="send"
                        className="btn btn-primary btn-lg shadow-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      case "reset":
        return (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="p-4 rounded-3 shadow-lg border-0">
                <h3 className="text-center mb-4 fw-bold text-primary">
                  Change Password
                </h3>
                <form onSubmit={pwdChange}>
                  {/* Old Password */}
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Old Password
                    </label>
                    <input
                      name="password"
                      id="password"
                      type="password"
                      className="form-control shadow-sm"
                      placeholder="Enter old password"
                      onChange={(e) => setPwd(e.target.value)}
                    />
                  </div>

                  {/* New Password */}
                  <div className="mb-3">
                    <label
                      htmlFor="new-password"
                      className="form-label fw-semibold"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="new password"
                      id="new-password"
                      className="form-control shadow-sm"
                      placeholder="Enter new password"
                      onChange={(e) => setNewPwd(e.target.value)}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label
                      htmlFor="confirm-password"
                      className="form-label fw-semibold"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirm password"
                      id="confirm-password"
                      className="form-control shadow-sm"
                      placeholder="Confirm new password"
                      onChange={(e) => setConfirmPwd(e.target.value)}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      id="submit"
                      name="send"
                      className="btn btn-primary btn-lg shadow-sm"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case "reload":
        return (
          <div className="container">
            <div className="d-flex flex-wrap gap-3 justify-content-start">
              {/* Reload CommRentDB Button */}
              <button
                onClick={() => onReload("comm_rent")}
                className={`btn btn-lg px-4 py-2 shadow ${
                  loading1 ? "btn-primary disabled" : "btn-outline-primary"
                }`}
                disabled={loading1}
              >
                {loading1 ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Reloading...
                  </>
                ) : (
                  "Reload CommRentDB"
                )}
              </button>

              {/* Reload CommSaleDB Button */}
              <button
                onClick={() => onReload("comm_sale")}
                className={`btn btn-lg px-4 py-2 shadow ${
                  loading2 ? "btn-success disabled" : "btn-outline-success"
                }`}
                disabled={loading2}
              >
                {loading2 ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Reloading...
                  </>
                ) : (
                  "Reload CommSaleDB"
                )}
              </button>

              {/* Reload ResiRentDB Button */}
              <button
                onClick={() => onReload("resi_rent")}
                className={`btn btn-lg px-4 py-2 shadow ${
                  loading3 ? "btn-warning disabled" : "btn-outline-warning"
                }`}
                disabled={loading3}
              >
                {loading3 ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Reloading...
                  </>
                ) : (
                  "Reload ResiRentDB"
                )}
              </button>

              {/* Reload ResiSaleDB Button */}
              <button
                onClick={() => onReload("resi_sale")}
                className={`btn btn-lg px-4 py-2 shadow ${
                  loading4 ? "btn-danger disabled" : "btn-outline-danger"
                }`}
                disabled={loading4}
              >
                {loading4 ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Reloading...
                  </>
                ) : (
                  "Reload ResiSaleDB"
                )}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <p className="alert alert-info mt-4 shadow-sm">{message}</p>
            )}
          </div>
        );
      case "sales":
        return (
          <div className="container p-4 rounded-3 shadow">
            <h4 className="mb-4 text-center">SalesPerson Selection</h4>
            <div className="row g-4">
              {items.map((item, itemInd) => (
                <div className="col-md-6" key={item.id}>
                  <div className="p-3 rounded-3 border">
                    <label
                      htmlFor={item.id}
                      className="form-label fs-6 fw-bold"
                    >
                      {item.label}
                    </label>
                    <Select
                      id={item.id}
                      options={salesPersons.map((person, index) => ({
                        value: index,
                        label: person.username,
                      }))}
                      defaultValue={
                        dbSalesPersons.length > 0
                          ? {
                              value: -1,
                              label: dbSalesPersons[itemInd].userName,
                            }
                          : { value: -1, label: "No Selected" }
                      }
                      onChange={(selectedOption) =>
                        salesHandleChange(selectedOption, item.id)
                      }
                      placeholder={`${item.label}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Select a section to manage</div>;
    }
  };

  return (
    <>
      <Navbar
        navClass="defaultscroll sticky"
        logolight={true}
        menuClass="navigation-menu nav-left nav-light"
      />
      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg3})`, padding: "100px" }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  User Profile
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4 col-12">
              <div className="admin-sidebar bg-light p-4 rounded-3 shadow sticky-top">
                <h5 className="mb-4 text-center fw-bold text-primary">
                  {currentUser.role == 5
                    ? "Admin Panel"
                    : currentUser.role == 2
                    ? "Sales Person Panel"
                    : "User Panel"}
                </h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <span
                      onClick={() => setActiveSection("profile")}
                      className={`btn d-flex align-items-center justify-content-start w-100 py-2 px-3 rounded-2 ${
                        activeSection === "profile"
                          ? "active bg-primary text-white shadow"
                          : "bg-white text-dark"
                      }`}
                    >
                      <i className="mdi mdi-card-account-details-outline fs-5 me-2"></i>
                      Profile
                    </span>
                  </li>
                  <li className="mb-2">
                    <span
                      onClick={() => setActiveSection("reset")}
                      className={`btn d-flex align-items-center justify-content-start w-100 py-2 px-3 rounded-2 ${
                        activeSection === "reset"
                          ? "active bg-primary text-white shadow"
                          : "bg-white text-dark"
                      }`}
                    >
                      <i className="mdi mdi-key-outline fs-5 me-2"></i>
                      Reset Password
                    </span>
                  </li>
                  {currentUser.role == 5 && (
                    <>
                      <li className="mb-2">
                        <span
                          onClick={() => setActiveSection("users")}
                          className={`btn d-flex align-items-center justify-content-start w-100 py-2 px-3 rounded-2 ${
                            activeSection === "users"
                              ? "active bg-primary text-white shadow"
                              : "bg-white text-dark"
                          }`}
                        >
                          <i className="mdi mdi-account-tie fs-5 me-2"></i>
                          Users Management
                        </span>
                      </li>

                      <li className="mb-2">
                        <span
                          onClick={() => setActiveSection("reload")}
                          className={`btn d-flex align-items-center justify-content-start w-100 py-2 px-3 rounded-2 ${
                            activeSection === "reload"
                              ? "active bg-primary text-white shadow"
                              : "bg-white text-dark"
                          }`}
                        >
                          <i className="mdi mdi-database-import fs-5 me-2"></i>
                          DB Import
                        </span>
                      </li>

                      <li>
                        <span
                          onClick={() => setActiveSection("sales")}
                          className={`btn d-flex align-items-center justify-content-start w-100 py-2 px-3 rounded-2 ${
                            activeSection === "sales"
                              ? "active bg-primary text-white shadow"
                              : "bg-white text-dark"
                          }`}
                        >
                          <i className="mdi mdi-sale fs-5 me-2"></i>
                          Select Salesperson
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            {/* Main Content */}
            <div className="col-lg-9 col-md-8 col-12">{renderContent()}</div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
