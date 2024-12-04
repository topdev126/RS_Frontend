import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import bg3 from "../assect/images/bg/03.jpg";
import Navbar from "../components/navbar";
import LoadingModal from "../components/loading";
import SearchPan from "../components/searchPan";

import { FiHome, FiHeart, FiCamera } from "../assect/icons/vander";
import Footer from "../components/footer";

export default function List({ property }) {
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchloading, setSearchloading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation(); // Hook to detect URL changes
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page
  const [totalSearched, setTotalSearched] = useState(0);

  const navItems =
    property.name === "commercial" || property.name === "residential"
      ? ["Sale", "Rent"]
      : ["Commercial", "Residential"];
  const { database_url, db_index } = (() => {
    switch (property.name + navItems[activeIndex]) {
      case "rentCommercial":
      case "commercialRent":
        return { database_url: `${apiUrl}/api/admin/getCommRent`, db_index: 0 };

      case "rentResidential":
      case "residentialRent":
        return { database_url: `${apiUrl}/api/admin/getResiRent`, db_index: 2 };

      case "saleCommercial":
      case "commercialSale":
        return { database_url: `${apiUrl}/api/admin/getCommSale`, db_index: 1 };

      case "saleResidential":
      case "residentialSale":
        return { database_url: `${apiUrl}/api/admin/getResiSale`, db_index: 3 };

      default:
        throw new Error(
          `Unknown property type or navigation item: ${property.name}${navItems[activeIndex]}`
        );
    }
  })();
  // Fetch property data
  useEffect(() => {
    fetch(database_url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((propertyData) => {
        setPropertyData(propertyData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [location.pathname, activeIndex]);
  if (loading) {
    return <div>Loading...</div>;
  }
  // Calculate the total number of pages
  const totalPages = Math.ceil(propertyData.length / itemsPerPage);

  // Get items for the current page
  const currentItems = propertyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
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
        className="bg-half-170 d-table align-items-center w-100"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="bg-overlay bg-linear-gradient-2"></div>
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-12 text-center">
              <div className="title-heading text-center">
                <h4 className="heading fw-bold text-white title-dark mb-3">
                  Easy way to find your <br /> dream property
                </h4>
                <p className="para-desc text-white-50 title-dark mx-auto mb-0">
                  A great platform to buy, sell, and rent your properties
                  without any agent or commissions.
                </p>
              </div>

              <div className="mt-4">
                <ul
                  className="nav nav-pills bg-white shadow border-bottom p-3 flex-row d-md-inline-flex nav-justified mb-0 rounded-top-3 position-relative overflow-hidden"
                  id="pills-tab"
                  role="tablist"
                >
                  {navItems.map((item, index) => (
                    <li className="nav-item m-1" key={index}>
                      <button
                        className="btn py-2 px-4 rounded-3 fw-medium"
                        style={
                          activeIndex === index
                            ? {
                                backgroundColor: "rgb(13 110 253)",
                                color: "white",
                              }
                            : { backgroundColor: "white", color: "black" }
                        }
                        onClick={() => setActiveIndex(index)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
                <SearchPan
                  setPropertyData={setPropertyData}
                  db_index={db_index}
                  setSearchloading={setSearchloading}
                  setTotalSearched={setTotalSearched}
                />
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
      <LoadingModal show={searchloading} />
      <section className="section">
        <div className="container">
          <div className="row g-4 mt-0">
            {totalSearched > 0 && (
              <div class="card text-center">
                <div class="card-body border-0 shadow">
                  <h2 class="card-title">
                    <span
                      class="badge bg-primary"
                      style={{ maxWidth: "300px", padding: "10px" }}
                    >
                      Total: {totalSearched}
                    </span>
                  </h2>
                  <p class="card-text">Items found based on your search.</p>
                </div>
              </div>
            )}
            {currentItems.map((item, index) => (
              <div className="col-lg-6 col-12" key={index}>
                <div className="card property property-list border-0 shadow position-relative overflow-hidden rounded-3">
                  <div className="d-md-flex">
                    <div className="property-image position-relative overflow-hidden shadow flex-md-shrink-0 rounded-3 m-2">
                      {/* <ImageComponent link={item.images_list[1]} altText="Description of Image" /> */}
                      <img
                        src={item.images_list[1]}
                        className="img-fluid w-100"
                        style={{ height: "200px" }}
                        alt=""
                      />
                      {/* <img src="https://pic2.99.co/v3/3JTw8pg8ci8oFMqjAr3x5L?text=Henry+Tan&sampling=lanczos&version=1&height=600&width=800&mode=fill&quality=80&convert_if_png=true&is_watermark=True&signature=0822289cdc353adee9f5a42f92c9a5c981b009b5" /> */}
                      <ul className="list-unstyled property-icon">
                        <li>
                          <Link
                            to="#"
                            className="btn btn-sm btn-icon btn-pills btn-primary"
                          >
                            <FiHome className="icons" />
                          </Link>
                        </li>
                        <li className="mt-1">
                          <Link
                            to="#"
                            className="btn btn-sm btn-icon btn-pills btn-primary"
                          >
                            <FiHeart className="icons" />
                          </Link>
                        </li>
                        <li className="mt-1">
                          <Link
                            to="#"
                            className="btn btn-sm btn-icon btn-pills btn-primary"
                          >
                            <FiCamera className="icons" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body content p-3">
                      <Link
                        // to={item.link}
                        to={`/detail/${db_index}/${item._id}`}
                        className="title fs-5 text-dark fw-medium"
                      >
                        {item.name}
                      </Link>
                      <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                        {(db_index == 0 || db_index == 1) && (
                          <>
                            <li className="d-flex align-items-center me-3">
                              <i className="mdi mdi-map-marker fs-4 me-2 text-primary"></i>
                              <span className="text-muted">
                                {item.district}
                              </span>
                            </li>
                            <li className="d-flex align-items-center me-3">
                              <i className="mdi mdi-arrow-expand-all fs-5 me-2 text-primary"></i>
                              <span className="text-muted">
                                {item.area_size}sqft
                              </span>
                            </li>
                          </>
                        )}
                        {(db_index == 2 || db_index == 3) && (
                          <>
                            <li className="d-flex align-items-center me-3">
                              <i className="mdi mdi-arrow-expand-all fs-5 me-2 text-primary"></i>
                              <span className="text-muted">
                                {item.area_size}sqft
                              </span>
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="mdi mdi-bed fs-5 me-2 text-primary"></i>
                              <span className="text-muted">
                                {item.beds === -1 ? "Unkown" : item.beds} Beds
                              </span>
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="mdi mdi-shower fs-5 me-2 text-primary"></i>
                              <span className="text-muted">
                                {item.bathrooms === -1
                                  ? "Unkown"
                                  : item.bathrooms}{" "}
                                Baths
                              </span>
                            </li>
                          </>
                        )}
                      </ul>
                      <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                        <li className="list-inline-item mb-0">
                          <span className="text-muted">Price</span>
                          <p className="fw-medium mb-0">${item.price}</p>
                        </li>
                        <li className="list-inline-item mb-0 text-muted">
                          <span className="text-muted">Rating</span>
                          <ul className="fw-medium text-warning list-unstyled mb-0">
                            <li className="list-inline-item mb-0">
                              <i className="mdi mdi-star"></i>
                            </li>
                            <li className="list-inline-item mb-0">
                              <i className="mdi mdi-star"></i>
                            </li>
                            <li className="list-inline-item mb-0">
                              <i className="mdi mdi-star"></i>
                            </li>
                            <li className="list-inline-item mb-0">
                              <i className="mdi mdi-star"></i>
                            </li>
                            <li className="list-inline-item mb-0">
                              <i className="mdi mdi-star"></i>
                            </li>
                            <li className="list-inline-item mb-0 text-dark">
                              5.0(30)
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="row">
            <div className="col-12 mt-4 pt-2">
              <ul className="pagination justify-content-center mb-0">
                <li className="page-item">
                  <Link
                    className="page-link"
                    to="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">
                      <i className="mdi mdi-chevron-left fs-6"></i>
                    </span>
                  </Link>
                </li>

                {/* Generate page buttons */}
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  // Calculate start and end page range
                  let startPage = Math.max(currentPage - 2, 1); // Ensure it's at least 1
                  let endPage = Math.min(currentPage + 2, totalPages); // Ensure it's not beyond totalPages

                  // Adjust startPage if the range is smaller than 5 pages
                  if (endPage - startPage < 4) {
                    startPage = Math.max(endPage - 4, 1);
                  }

                  // Handle page numbers from startPage to endPage
                  return (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === startPage + i ? "active" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        onClick={() => handlePageChange(startPage + i)}
                      >
                        {startPage + i}
                      </Link>
                    </li>
                  );
                })}

                <li className="page-item">
                  <Link
                    className="page-link"
                    to="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">
                      <i className="mdi mdi-chevron-right fs-6"></i>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
