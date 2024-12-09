import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import FooterTopImage from "../components/FoterTopImage";
// import LoadingModal from "../components/loading";
import "../../node_modules/react-modal-video/css/modal-video.css";
import Footer from "../components/footer";
import { useDispatch } from "react-redux";
import { getRelatedSearch } from "../redux/search/searchSlice.js";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function HomePage() {
  const { currentUser } = useSelector((state) => state.user);

  const [activeIndex_1, setActiveIndex_1] = useState(0); // 0 for Commercial, 1 for Residential
  const [activeIndex_2, setActiveIndex_2] = useState(0); // 0 for Rent, 1 for Sale

  const [propertyData, setPropertyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSearched, setTotalSearched] = useState(0);

  const [count, setCount] = useState([0, 0, 0, 0]);

  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const itemsPerPage = 16; // Number of items per page

  const totalPages = Math.ceil(totalSearched / itemsPerPage);
  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const { db_index } = (() => {
    switch (String(activeIndex_1) + String(activeIndex_2)) {
      case "00": // Commercial + Rent
        return { db_index: 0 };
      case "01": // Commercial + Sale
        return { db_index: 1 };
      case "10": // Residential + Rent
        return { db_index: 2 };
      case "11": // Residential + Sale
        return { db_index: 3 };
      default:
        return { db_index: 0 };
    }
  })();

  const setFavorite = async (id) => {
    const payload = {
      list_id: id,
      user_id: currentUser._id,
      cate: db_index,
    };
    fetch(`${apiUrl}/api/admin/searchFavorite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    const payload = {
      cate: db_index,
      user_id: currentUser._id,
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
    };

    fetch(`${apiUrl}/api/admin/searchFavorite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setPropertyData(data.row);
        setTotalSearched(data.count);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  };
  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 1) handleSearch();
    else setCurrentPage(1);
  }, [activeIndex_1, activeIndex_2]);

  return (
    <>
      <Navbar
        navClass="defaultscroll sticky"
        logolight={true}
        menuClass="navigation-menu nav-left nav-light"
      />
      <section
        className="d-table align-items-center w-100"
        style={{ padding: "75px" }}
      >
        <div className="container">
          <div className="col-12 text-center">
            <div className="mt-4">
              <ul
                className="nav nav-pills bg-white shadow border-bottom p-3 flex-row d-md-inline-flex nav-justified mb-0 rounded-top-3 position-relative overflow-hidden"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item m-1">
                  {/* Commercial */}
                  <button
                    className="btn py-2 px-4 rounded-3 fw-medium"
                    onClick={() => setActiveIndex_1(0)}
                    style={
                      activeIndex_1 === 0
                        ? {
                            backgroundColor: "rgb(13 110 253)",
                            color: "white",
                          }
                        : { backgroundColor: "white", color: "black" }
                    }
                  >
                    Commercial
                  </button>
                </li>

                <li className="nav-item m-1">
                  {/* Residential */}
                  <button
                    className="btn py-2 px-4 rounded-3 fw-medium"
                    onClick={() => setActiveIndex_1(1)}
                    style={
                      activeIndex_1 === 1
                        ? {
                            backgroundColor: "rgb(13 110 253)",
                            color: "white",
                          }
                        : { backgroundColor: "white", color: "black" }
                    }
                  >
                    Residential
                  </button>
                </li>
                <li className="nav-item m-1">
                  {/* Rent */}
                  <button
                    className="btn py-2 px-4 rounded-3 fw-medium"
                    onClick={() => setActiveIndex_2(0)}
                    style={
                      activeIndex_2 === 0
                        ? {
                            backgroundColor: "rgb(35 129 50)",
                            color: "white",
                          }
                        : { backgroundColor: "white", color: "black" }
                    }
                  >
                    Rent
                  </button>
                </li>

                <li className="nav-item m-1">
                  {/* Sale */}
                  <button
                    className="btn py-2 px-4 rounded-3 fw-medium"
                    onClick={() => setActiveIndex_2(1)}
                    style={
                      activeIndex_2 === 1
                        ? {
                            backgroundColor: "rgb(35 129 50)",
                            color: "white",
                          }
                        : { backgroundColor: "white", color: "black" }
                    }
                  >
                    Sale
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{ padding: "0px", marginBottom: "-50px" }}
      >
        <div className="container">
          <div className="row g-4 mt-0">
            {propertyData.map((item, index) => (
              <div className="col-lg-6 col-12" key={index}>
                <div className="card property property-list border-0 shadow position-relative overflow-hidden rounded-3">
                  <div className="d-md-flex">
                    <div
                      className="property-image position-relative overflow-hidden shadow flex-md-shrink-0 rounded-3 m-2"
                      style={{ height: "200px" }}
                    >
                      <img
                        src={item.images_list[1]}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                      <ul className="list-unstyled property-icon">
                        {currentUser && (
                          <>
                            <li className="mt-1">
                              <label
                                onClick={() => setFavorite(item._id)}
                                className="btn btn-sm btn-icon btn-pills btn-primary"
                              >
                                <FaRegHeart className="icons" />
                              </label>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="card-body content p-3">
                      <Link
                        // to={item.link}
                        to={`/detail/${db_index}/${item._id}`}
                        target="_blank"
                        className="title fs-4 text-dark fw-medium "
                      >
                        {item.name}
                      </Link>
                      <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                        {(db_index === 0 || db_index === 1) && (
                          <>
                            <li className="d-flex align-items-center me-3">
                              <i className="mdi mdi-arrow-expand-all fs-5 me-2 text-primary"></i>
                              <span className="text-muted">
                                {parseInt(item.area_size).toLocaleString()} sqft
                              </span>
                            </li>

                            <li className="d-flex align-items-center me-3">
                              <i className="mdi mdi-view-grid fs-4 me-2 text-primary"></i>
                              <span className="text-muted">
                                {item.property_type}
                              </span>
                            </li>
                          </>
                        )}
                        {(db_index === 2 || db_index === 3) && (
                          <>
                            <li className="d-flex align-items-center me-3">
                              <i className="mdi mdi-arrow-expand-all fs-5 me-2 text-primary"></i>
                              <span className="text-muted">
                                {parseInt(item.area_size).toLocaleString()}sqft
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
                          <p className="fs-5 fw-medium mb-0">
                            ${parseInt(item.price).toLocaleString()}
                            {(db_index === 0 || db_index === 2) && "/mon"}
                          </p>
                        </li>
                        {(db_index === 2 || db_index === 3) && (
                          <li className="list-inline-item mb-0">
                            <ul className="fs-6 fw-medium mb-0">{item.mrt}</ul>
                          </li>
                        )}
                        {(db_index === 0 || db_index === 1) && (
                          <li className="list-inline-item mb-0">
                            <ul className="fs-6 fw-medium mb-0">
                              {item.district}
                            </ul>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          {totalSearched > 1 && (
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
          )}
        </div>
      </section>
      <FooterTopImage />
      <Footer />
    </>
  );
}
