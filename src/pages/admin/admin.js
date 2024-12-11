import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import bg3 from "../../assect/images/bg/03.jpg";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AdminSidebar from "../../components/admin/adminSidebar"; // Import AdminSidebar
import { propertyData } from "../../data/data";
import { FiHome, FiHeart, FiCamera } from "../../assect/icons/vander";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AdminPage() {
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const [activeSection, setActiveSection] = useState("users");
  const [loading1, setLoading1] = useState(false); // Track loading state
  const [loading2, setLoading2] = useState(false); // Track loading state
  const [loading3, setLoading3] = useState(false); // Track loading state
  const [loading4, setLoading4] = useState(false); // Track loading state
  const [message, setMessage] = useState(""); // Feedback message for the user

  const [users, setUsers] = useState([]);

  const url = `${apiUrl}/api/users/`;
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((users) => {
        console.log(users);
        setUsers(users);
        setLoading1(false);
        setLoading2(false);
        setLoading3(false);
        setLoading4(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading1(false);
        setLoading2(false);
        setLoading3(false);
        setLoading4(false);
      });
  }, []);

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
                <Form id="searchUser" className="d-flex m-2">
                  <Form.Control
                    type="text"
                    placeholder="Search by User Name"
                    className="me-2"
                  />
                  <Button type="button">Search</Button>
                </Form>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <Button type="button" className="m-2" variant="secondary">
                  Agency
                </Button>
                <Button type="button" className="m-2" variant="secondary">
                  Client
                </Button>
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
                      {" "}
                      {/* Assuming each user has a unique _id */}
                      <td>{user.email}</td>{" "}
                      {/* Replace 'email' with the actual key if it's different */}
                      <td>{user.createdAt}</td>{" "}
                      {/* Replace 'agency' with the actual key if it's different */}
                      <td>
                        <Form.Select id="userRole" defaultValue={user.role}>
                          {user.role}
                          <option>Agency</option>
                          <option>Client</option>
                        </Form.Select>
                      </td>{" "}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form>
          </div>
        );
      case "products":
        return <div>Manage Products Section</div>;
      case "settings":
        return <div>Manage Settings Section</div>;
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
        style={{ backgroundImage: `url(${bg3})`, padding: "50px" }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <p className="text-white-50 para-desc mx-auto mb-0">
                  Admin Panel
                </p>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Manage Platform
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
                <h6 className="mb-4">Admin Panel</h6>
                <ul className="list-unstyled">
                  <li>
                    <button
                      onClick={() => setActiveSection("users")}
                      className={`btn btn-link text-start w-100 ${
                        activeSection === "users" ? "active" : ""
                      }`}
                    >
                      Users
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection("products")}
                      className={`btn btn-link text-start w-100 ${
                        activeSection === "products" ? "active" : ""
                      }`}
                    >
                      Products
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection("settings")}
                      className={`btn btn-link text-start w-100 ${
                        activeSection === "settings" ? "active" : ""
                      }`}
                    >
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection("reload")}
                      className={`btn btn-link text-start w-100 ${
                        activeSection === "reload" ? "active" : ""
                      }`}
                    >
                      Reload DB
                    </button>
                  </li>
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
