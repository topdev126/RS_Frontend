import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import bg3 from "../assect/images/bg/03.jpg";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userUpdateSuccess } from "../redux/user/userSlice.js";

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

  const [users, setUsers] = useState([]);

  const [fullName, setFullName] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [selectedImage, setSelectedImage] = useState(null); // State to hold the loaded image

  const handleFileChange = async (event) => {
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("id", currentUser._id);
      const response = await fetch(`${apiUrl}/upload`, {
        // Replace with your server endpoint
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const updatedUser = {
        ...currentUser,
        avatar: data.buffer,
        contentType: data.type,
      };

      dispatch(userUpdateSuccess(updatedUser));
      toast.success(data.message);
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error(`HTTP error! status: ${response.status}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        toast.error(error);
        console.log("Error fetching data:", error);
      });
  };
  useEffect(() => {
    getAllUser();
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
      headers: { "Content-Type": "application/json" },
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
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {});
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
  // Function to render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <div>
            <div className="row">
              <div className="col-6">
                <Form.Control
                  type="text"
                  placeholder="Search by User Name"
                  className="me-2"
                  onChange={getAllUser}
                />
              </div>
            </div>
            <Form id="userRole">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Created Date</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.email}</td> <td>{user.createdAt}</td>{" "}
                      <td>
                        <Form.Select
                          id={user._id}
                          defaultValue={user.role}
                          onChange={(event) => roleChange(user._id, event)}
                        >
                          <option value={-1}>No Permission</option>
                          <option value={0}>Client</option>
                          <option value={2}>Agency</option>
                          <option value={5}>Admin</option>
                        </Form.Select>
                      </td>{" "}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form>
          </div>
        );
      case "profile":
        return (
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="p-4 rounded-3 shadow">
                <div className="row">
                  <div className="col-md-12" style={{ textAlign: "center" }}>
                    <label onClick={handleUpload} style={{ cursor: "pointer" }}>
                      Edit Avatar
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-md-12" style={{ textAlign: "center" }}>
                    <img
                      style={{ height: "150px", width: "150px" }} // Explicit size
                      // src={user.avatar.data}
                      // src={`data:${currentUser.contentType};base64,${btoa(
                      //   String.fromCharCode(
                      //     ...new Uint8Array(currentUser.avatar.data)
                      //   )
                      src={`data:${currentUser.contentType};base64,${btoa(
                        new Uint8Array(currentUser.avatar.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
                      )}`}
                      alt="profile image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-4 rounded-3 shadow">
                <form onSubmit={profileSave}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Your Name</label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="form-control"
                          placeholder="Name :"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Your Email</label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="form-control"
                          placeholder="Email :"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          id="submit"
                          name="send"
                          className="btn btn-primary"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case "reset":
        return (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="p-4 rounded-3 shadow">
                <form submit={pwdChange}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Old Password</label>
                        <input
                          name="password"
                          id="password"
                          type="password"
                          className="form-control"
                          onChange={(e) => setPwd(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                          type="password"
                          name="new password"
                          id="new password"
                          className="form-control"
                          onChange={(e) => setNewPwd(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          name="confirm password"
                          id="confirm password"
                          className="form-control"
                          onChange={(e) => setConfirmPwd(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        id="submit"
                        name="send"
                        className="btn btn-primary"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case "reload":
        return (
          <div>
            <button
              onClick={() => onReload("comm_rent")}
              className="btn btn-outline-primary btn-lg px-4 py-2 me-2"
              disabled={loading1}
            >
              {loading1 ? "Reloading..." : "Reload CommRentDB"}
            </button>
            <button
              onClick={() => onReload("comm_sale")}
              className="btn btn-outline-success btn-lg px-4 py-2 me-2"
              disabled={loading2}
            >
              {loading2 ? "Reloading..." : "Reload CommSaleDB"}
            </button>
            <button
              onClick={() => onReload("resi_rent")}
              className="btn btn-outline-warning btn-lg px-4 py-2 me-2"
              disabled={loading3}
            >
              {loading3 ? "Reloading..." : "Reload ResiRentDB"}
            </button>
            <button
              onClick={() => onReload("resi_sale")}
              className="btn btn-outline-danger btn-lg px-4 py-2 me-2"
              disabled={loading4}
            >
              {loading4 ? "Reloading..." : "Reload ResiSaleDB"}
            </button>
            {message && <p className="mt-3">{message}</p>}
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
              <div className="admin-sidebar bg-light p-4 rounded-3 shadow sticky-bar">
                <ul className="list-unstyled">
                  <li>
                    <span
                      onClick={() => setActiveSection("profile")}
                      className={`btn text-start w-80 ${
                        activeSection === "profile" ? "active" : ""
                      }`}
                      style={{ width: "100%" }}
                    >
                      <i className="mdi mdi-card-account-details-outline fs-5 me-2 "></i>
                      Profile
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setActiveSection("reset")}
                      className={`btn text-start w-80 ${
                        activeSection === "reset" ? "active" : ""
                      }`}
                      style={{ width: "100%" }}
                    >
                      <i className="mdi mdi-card-account-details-outline fs-5 me-2 "></i>
                      Rset Password
                    </span>
                  </li>
                  {currentUser.role == 5 && (
                    <>
                      <li>
                        <span
                          onClick={() => setActiveSection("users")}
                          className={`btn text-start w-80 ${
                            activeSection === "users" ? "active" : ""
                          }`}
                          style={{ width: "100%" }}
                        >
                          <i className="mdi mdi-account-tie fs-5 me-2 "></i>
                          Users Management
                        </span>
                      </li>
                      <li>
                        <span
                          onClick={() => setActiveSection("reload")}
                          className={`btn text-start w-80 ${
                            activeSection === "reload" ? "active" : ""
                          }`}
                        >
                          <i className="mdi mdi-database-import fs-5 me-2 "></i>
                          DB Import
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
