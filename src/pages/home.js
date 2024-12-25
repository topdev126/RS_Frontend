import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assect/images/bg/01.jpg";
import heroImg from "../assect/images/hero.jpg";
import Navbar from "../components/navbar";
import SearchPan from "../components/searchPan";
import AboutUs from "../components/about";
import Broker from "../components/broker";
import { handleRemoveElement, setFavorite } from "../components/helper.js";
import ClientTwo from "../components/clientTwo";
import Blog from "../components/blog";
import FooterTopImage from "../components/FoterTopImage";
import { ToggleView } from "../components/toggleView.js";
import { ListView } from "../components/listView.js";

// import LoadingModal from "../components/loading";
import CountUp from "react-countup";
import ModalVideo from "react-modal-video";
import "../../node_modules/react-modal-video/css/modal-video.css";
import Footer from "../components/footer";
import { useDispatch } from "react-redux";
import { getRelatedSearch } from "../redux/search/searchSlice.js";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";


export default function HomePage({ param }) {
  const { currentUser } = useSelector((state) => state.user);

  const initAreaMinVal = 0;
  const initAreaMaxVal = 0;

  const [activeIndex_1, setActiveIndex_1] = useState(0); // 0 for Commercial, 1 for Residential
  const [activeIndex_2, setActiveIndex_2] = useState(0); // 0 for Rent, 1 for Sale

  const [isOpen, setOpen] = useState(false);
  const [searchloading, setSearchloading] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSearched, setTotalSearched] = useState(0);
  const [isGridView, setIsGridView] = useState(false);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [selectedPropType, setSelectedPropType] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [minAreaVal, setMinAreaVal] = useState(initAreaMinVal);
  const [maxAreaVal, setMaxAreaVal] = useState(initAreaMaxVal);
  const [selectedBeds, setSelectedBeds] = useState([]);
  const [selectedBaths, setSelectedBaths] = useState([]);

  const [selectedAmenity, setSelectedAmenity] = useState([]);
  const [selectedMrt, setSelectedMrt] = useState([]);
  const [selectedFurnishing, setSelectedFurnishing] = useState([]);
  const [selectedSubProperties, setSelectedSubProperties] = useState([]);
  const [selectedSubAmenities, setSelectedSubAmenities] = useState([]);
  const [selectedSubMrts, setSelectedSubMrts] = useState([]);
  const [subProperties, setSubProperties] = useState([]);
  const [subAmenities, setSubAmenities] = useState([]);
  const [subMrts, setSubMrts] = useState([]);

  const [devNameKeys, setDevNameKeys] = useState("");
  const [tenureKeys, setTenureKeys] = useState("");
  const [addressKeys, setAddressKeys] = useState("");
  const [nameKeys, setNameKeys] = useState("");
  const [wordKeys, setWordKeys] = useState("");

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
  const getRandomElements = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, count); // Get the first 'count' elements
  };

  const deleteList = async (id) => {
    const payload = {
      list_id: id,
      user_id: currentUser._id,
      cate: db_index,
    };
    fetch(`${apiUrl}/api/admin/deleteList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setPropertyData(propertyData.filter((item) => item._id !== id));
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
    setSearchloading(true);

    const payload = {
      db_index: db_index,
      wordKeys: wordKeys,
      nameKeys: nameKeys,
      minPrice: minPrice,
      maxPrice: maxPrice,
      district: selectedDistrict.map((element) => element.value),
      minAreaVal: minAreaVal,
      maxAreaVal: maxAreaVal,
      BedsNums: selectedBeds.map((element) => element.value),
      BathsNums: selectedBaths.map((element) => element.value),
      tenureKeys: tenureKeys,
      addressKeys: addressKeys,
      devNameKeys: devNameKeys,
      selectedSubMrts: selectedMrt.map((element) => element.value),
      selectedSubAmenities: selectedAmenity.map((element) => element.value),
      selectedSubProperties: selectedPropType.map((element) => element.value),
      selectedFurnishing: selectedFurnishing.map((element) => element.value),

      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
    };

    fetch(`${apiUrl}/api/admin/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setPropertyData(data.row);
        setSearchloading(false);
        setTotalSearched(data.count);

        dispatch(getRelatedSearch(getRandomElements(data.row, 20)));
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setSearchloading(false);
      });

    fetch(`${apiUrl}/api/admin/getDBCount`)
      .then((response) => response.json())
      .then((data) => {
        setCount((prevCount) => {
          const updatedCount = [...prevCount]; // Spread the previous values
          updatedCount[0] = data.count; // Update the second element
          updatedCount[1] = data.count1;
          updatedCount[2] = data.count2;
          updatedCount[3] = data.count3;
          return updatedCount; // Return the new array
        });
      });
  };
  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  useEffect(() => {
    setActiveIndex_1(param.val1);
    setActiveIndex_2(param.val2);
  }, [param]);

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
        className="bg-half-170 d-table align-items-center w-100"
        style={{ backgroundImage: `url(${backgroundImage})` }}
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
                  {param.val === "" && (
                    <>
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
                    </>
                  )}
                  {(param.val === "rent" || param.val === "sale") && (
                    <>
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
                    </>
                  )}
                  {(param.val === "commercial" ||
                    param.val === "residential") && (
                    <>
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
                    </>
                  )}
                </ul>
                <SearchPan
                  devNameKeys={devNameKeys}
                  setDevNameKeys={setDevNameKeys}
                  tenureKeys={tenureKeys}
                  setTenureKeys={setTenureKeys}
                  addressKeys={addressKeys}
                  setAddressKeys={setAddressKeys}
                  nameKeys={nameKeys}
                  setNameKeys={setNameKeys}
                  setWordKeys={setWordKeys}
                  wordKeys={wordKeys}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  minAreaVal={minAreaVal}
                  maxAreaVal={maxAreaVal}
                  setSelectedPropType={setSelectedPropType}
                  selectedPropType={selectedPropType}
                  setSelectedDistrict={setSelectedDistrict}
                  selectedDistrict={selectedDistrict}
                  setMinAreaVal={setMinAreaVal}
                  setMaxAreaVal={setMaxAreaVal}
                  selectedBeds={selectedBeds}
                  setSelectedBeds={setSelectedBeds}
                  selectedBaths={selectedBaths}
                  setSelectedBaths={setSelectedBaths}
                  selectedAmenity={selectedAmenity}
                  setSelectedAmenity={setSelectedAmenity}
                  setSelectedMrt={setSelectedMrt}
                  selectedMrt={selectedMrt}
                  selectedFurnishing={selectedFurnishing}
                  setSelectedFurnishing={setSelectedFurnishing}
                  selectedSubProperties={selectedSubProperties}
                  setSelectedSubProperties={setSelectedSubProperties}
                  selectedSubAmenities={selectedSubAmenities}
                  setSelectedSubAmenities={setSelectedSubAmenities}
                  selectedSubMrts={selectedSubMrts}
                  setSelectedSubMrts={setSelectedSubMrts}
                  subProperties={subProperties}
                  setSubProperties={setSubProperties}
                  subAmenities={subAmenities}
                  setSubAmenities={setSubAmenities}
                  subMrts={subMrts}
                  setSubMrts={setSubMrts}
                  handleSearch={handleSearch}
                  setPropertyData={setPropertyData}
                  db_index={db_index}
                  searchloading={searchloading}
                  setTotalSearched={setTotalSearched}
                  initAreaMinVal={initAreaMinVal}
                  initAreaMaxVal={initAreaMaxVal}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <LoadingModal show={searchloading} /> */}

      <section className="section" style={{ padding: "0px" }}>
        <div className="container">
          <div className="row g-4 mt-0">
            {/* <div >Searched Items: 10000</div> */}
            <ToggleView 
            isGridView={isGridView}
            setIsGridView={setIsGridView}
            />

            <div className="card text-center">
              <h2 className="card-title">
                <span
                  className="badge bg-secondary"
                  style={{ padding: "12px" }}
                >
                  {searchloading ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    `Total ${totalSearched} Items found`
                  )}
                </span>
              </h2>
            </div>

            {isGridView && propertyData.map((item, index) => (
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
                                onClick={() =>
                                  setFavorite(
                                    item._id,
                                    currentUser._id,
                                    db_index
                                  )
                                }
                                className="btn btn-sm btn-icon btn-pills btn-primary"
                              >
                                <FaRegHeart className="icons" />
                              </label>
                            </li>
                          </>
                        )}
                        {currentUser && currentUser.role > 0 && (
                          <>
                            <li className="mt-1">
                              <label
                                onClick={() =>
                                  handleRemoveElement(
                                    item._id,
                                    deleteList,
                                    "Post"
                                  )
                                }
                                className="btn btn-sm btn-icon btn-pills btn-primary"
                              >
                                <MdDelete className="icons" />
                              </label>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="card-body content p-3">
                      <Link
                        // to={item.link}
                        to={
                          currentUser && currentUser.role > 1
                            ? `/detail-admin/${db_index}/${item._id}`
                            : `/detail/${db_index}/${item._id}`
                        }
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
            {!isGridView && <ListView items={propertyData} index={db_index} role={currentUser?currentUser.role:-99} user_id={currentUser?currentUser._id:-99}/>}
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
      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6">
              <div className="position-relative overflow-hidden shadow p-3 rounded-top-pill rounded-5 bg-white">
                <img
                  src={heroImg}
                  className="img-fluid rounded-top-pill rounded-5"
                  alt="Pro-2"
                />

                <div className="position-absolute top-50 start-50 translate-middle">
                  <Link
                    to="#!"
                    onClick={() => setOpen(true)}
                    className="avatar avatar-md-md rounded-pill shadow card d-flex justify-content-center align-items-center lightbox"
                  >
                    <i className="mdi mdi-play mdi-24px text-primary"></i>
                  </Link>
                </div>
                <ModalVideo
                  channel="youtube"
                  youtube={{ mute: 0, autoplay: 0 }}
                  isOpen={isOpen}
                  videoId="yba7hPeTSjk"
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>

            <div className="col-lg-7 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ms-lg-5">
                <h6 className="text-primary fw-medium mb-2">
                  Our story: Pro-2
                </h6>
                <h4 className="title mb-3">
                  Efficiency. <br /> Transparency. Control.
                </h4>
                <p className="text-muted para-desc mb-0">
                  Pro-2 developed a platform for the Real Estate marketplace
                  that allows buyers and sellers to easily execute a transaction
                  on their own. The platform drives efficiency, cost
                  transparency and control into the hands of the consumers.
                  Pro-2 is Real Estate Redefined.
                </p>

                <div className="row">
                  <div className="col-3 py-3">
                    <div className="counter-box text-center">
                      <h1 className="mb-0 fw-semibold">
                        <CountUp
                          start={0}
                          end={count[0]}
                          className="counter-value"
                        />
                      </h1>
                      <h6 className="counter-head text-muted fw-normal">
                        Commercial Sale
                      </h6>
                    </div>
                  </div>

                  <div className="col-3 py-3">
                    <div className="counter-box text-center">
                      <h1 className="mb-0 fw-semibold">
                        <CountUp
                          start={0}
                          end={count[1]}
                          className="counter-value"
                        />
                      </h1>
                      <h6 className="counter-head text-muted fw-normal">
                        Commercial Rent
                      </h6>
                    </div>
                  </div>

                  <div className="col-3 py-3">
                    <div className="counter-box text-center">
                      <h1 className="mb-0 fw-semibold">
                        <CountUp
                          start={0}
                          end={count[2]}
                          className="counter-value"
                        />
                      </h1>
                      <h6 className="counter-head text-muted fw-normal">
                        Residential Sale
                      </h6>
                    </div>
                  </div>
                  <div className="col-3 py-3">
                    <div className="counter-box text-center">
                      <h1 className="mb-0 fw-semibold">
                        <CountUp
                          start={0}
                          end={count[3]}
                          className="counter-value"
                        />
                      </h1>
                      <h6 className="counter-head text-muted fw-normal">
                        Residential Rent
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <AboutUs />
        </div>

        <div className="container mt-100 mt-60">
          <Broker />
        </div>

        <div className="container mt-100 mt-60 client">
          <ClientTwo />
        </div>

        <div className="container mt-100 mt-60">
          <Blog />
        </div>
      </section>
      <FooterTopImage />
      <Footer />
    </>
  );
}
