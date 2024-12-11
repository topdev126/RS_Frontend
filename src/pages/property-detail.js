import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import ProprtySlider from "../components/propertySlider";
import ContactDetail from "../components/contactDetail";
import TinySlider from "tiny-slider-react";
import "../../node_modules/tiny-slider/dist/tiny-slider.css";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { Districts_Arr as districts } from "../components/districts";
import RealEstateMap from "./myMap";
export default function PropertyDetailsTwo() {
  const labels = [
    "Commercial | Rent",
    "Commercial | Sale",
    "Residential | Rent",
    "Residential | Sale",
  ];

  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);
  const [contactPerson, setContactPerson] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerHeight);
  const [permission, setPermission] = useState(0);

  const params = useParams();
  const id = params.id;
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const settings = {
    container: ".tiny-one-item",
    controls: true,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: false,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    controlsText: [
      '<i class="mdi mdi-chevron-left"></i>',
      '<i class="mdi mdi-chevron-right"></i>',
    ],
    nav: false,
    speed: 1000,
    gutter: 0,
    // Use responsive breakpoints
    responsive: {
      0: {
        items: 1, // For small screens
      },
      768: {
        items: 2, // For larger screens
      },
    },
  };
  const relatedSearchs = useSelector((state) => state.search.relatedSearchs);
  const url = `${apiUrl}/api/admin/getDetail/${params.idb}/${params.id}`;
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
        // "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Extract status and parse JSON
        return response.json().then((data) => ({
          status: response.status,
          data,
        }));
      })
      .then(({status, data}) => {
        if (status === 202) {
          setContactPerson(data.salesPerson);
        } else if (status === 201) {
          setContactPerson(data.adminUser);
        } else if (status === 200) {
          setContactPerson(data.salesPerson);
        }
        setCurrentItem(data.detail);
        setPermission(data.permission);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerHeight);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const scrollToSection = () => {
    const section = document.getElementById("sendMessage");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth", // For smooth scrolling
        block: "start", // Align to the top of the section
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar
        navClass="defaultscroll sticky"
        logolight={true}
        menuClass="navigation-menu nav-left nav-light"
      />
      <section>
        <div>
          <div className="row justify-content-center m-2">
            <div className="col-lg-12">
              <div className="tiny-one-item mt-5">
                <TinySlider settings={settings}>
                  {currentItem.images_list ? (
                    currentItem.images_list.map((item, index) => (
                      <div className="tiny-slide" key={index}>
                        <div className="m-2 image-container mt-4 tiny-slider-container">
                          <img
                            src={item}
                            alt=""
                            className="slider-image w-100"
                            style={{ borderRadius: "20px" }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No images available</div> // Optional: fallback UI
                  )}
                </TinySlider>
              </div>
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold mb-0 sub-heading title-dark py-4">
                  {currentItem.name}
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div>
            <Nav variant="tabs" defaultActiveKey="#detail">
              <Nav.Item>
                <Nav.Link href="#detail">Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#description">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#map">Location</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#related_property">Related Properties</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* <div className="features-absolute subscribe-search"> */}
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="rounded-3 shadow-lg bg-white sticky-bar p-4">
                    {/* Price and Label Section */}
                    <div
                      className="d-flex align-items-center justify-content-between row"
                      id="detail"
                    >
                      <h5 className="fs-4 p-2 col-lg-4 col-6">
                        $ {parseInt(currentItem.price).toLocaleString()}
                      </h5>
                      <h5 className="fs-3 p-2 col-lg-4 col-6">
                        Property Details
                      </h5>
                      <span className="badge bg-primary fs-4 p-2 col-lg-4 col-6">
                        {labels[params.idb]}
                      </span>
                    </div>

                    <hr
                      style={{ border: "1px solid #ccc", margin: "10px 0" }}
                    />

                    {/* Property Details Table */}
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th className="small table-header">Property Type</th>
                          <td className="small">
                            {currentItem.property_type != "NULL"
                              ? currentItem.property_type
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th className="small table-header">Address</th>
                          <td className="small">
                            {currentItem.address != "NULL"
                              ? currentItem.address
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th className="small table-header">District</th>
                          <td className="small">
                            {currentItem && currentItem.district.length > 2
                              ? currentItem.district +
                                "  (" +
                                districts[currentItem.district].join(" / ") +
                                ")"
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th className="small table-header">Area (sqft)</th>
                          <td className="small">
                            {parseInt(currentItem.area_size).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th className="small table-header">Price per sqft</th>
                          <td className="small">
                            $
                            {currentItem.area_size > 0
                              ? Math.floor(
                                  currentItem.price / currentItem.area_size
                                ).toLocaleString()
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th className="small table-header">Furnishing</th>
                          <td className="small">{currentItem.furnishing}</td>
                        </tr>
                        {(params.idb == 2 || params.idb == 3) && (
                          <>
                            <tr>
                              <th className="small table-header">Facing</th>
                              <td className="small">
                                {currentItem.facing !== "NULL"
                                  ? currentItem.facing
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <th className="small table-header">MRT</th>
                              <td className="small">{currentItem.mrt}</td>
                            </tr>
                            <tr>
                              <th className="small table-header">Unit Types</th>
                              <td className="small">
                                {currentItem.unit_types !== "NULL"
                                  ? currentItem.unit_types
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <th className="small table-header">
                                Total Units
                              </th>
                              <td className="small">
                                {currentItem.total_units !== "NULL"
                                  ? currentItem.total_units
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <th className="small table-header">
                                Neighbourhood
                              </th>
                              <td className="small">
                                {currentItem.neighbourhood !== "NULL"
                                  ? currentItem.neighbourhood
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <th className="small table-header">
                                Development Name
                              </th>
                              <td className="small">
                                {currentItem.dev_name !== "NULL"
                                  ? currentItem.dev_name
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <th className="small table-header">Beds</th>
                              <td className="small">
                                {currentItem.beds !== "NULL"
                                  ? currentItem.beds
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <th className="small table-header">Baths</th>
                              <td className="small">
                                {currentItem.bathrooms !== "NULL"
                                  ? currentItem.bathrooms
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <th className="small table-header">MRT</th>
                              <td className="small">
                                {currentItem.mrt !== "NULL"
                                  ? currentItem.mrt
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <th className="small table-header">Furnishing</th>
                              <td className="small">
                                {currentItem.furnishing !== "NULL"
                                  ? currentItem.furnishing
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <th className="small table-header">Tenure</th>
                              <td className="small">
                                {currentItem.tenure !== "NULL"
                                  ? currentItem.tenure
                                  : ""}
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>

                    {/* Amenities Section */}
                    <hr
                      style={{ border: "1px solid #ccc", margin: "10px 0" }}
                    />
                    {currentItem.amenities_list &&
                    currentItem.amenities_list.length > 0 ? (
                      <div className="d-flex flex-column align-items-center mt-2">
                        <span className="fs-3 text-center mb-2">Amenities</span>
                        <div className="d-flex flex-wrap gap-2">
                          {currentItem.amenities_list.map((item, index) => (
                            <span
                              key={index}
                              className="badge bg-light text-dark small"
                              style={{ color: "#1f1f1f" }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="small text-muted">
                        No amenities available
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="container mt-5" id="map">
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="card map border-0">
                      <div className="card-body p-0">
                        {/* <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                          title="Townter"
                          className="rounded-3"
                          style={{ border: "0" }}
                          allowFullScreen
                        ></iframe> */}
                        <RealEstateMap properties={currentItem} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}

              <p className="px-3 py-5" id="description">
                <div
                  dangerouslySetInnerHTML={{ __html: currentItem.description }}
                />
                {/* {currentItem.description} */}
              </p>
              <div className="container mt-60" id="related_property">
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="section-title text-center mb-4 pb-2">
                      <h4 className="title mb-3">Related Properties</h4>
                      <p className="para-desc mb-0 mx-auto fs-5">
                        A great plateform to buy, sell and rent your properties
                        without any agent or commisions.
                      </p>
                    </div>
                  </div>
                </div>

                <ProprtySlider
                  propertyData={relatedSearchs}
                  db_index={params.idb}
                />
              </div>
            </div>
            <div className="col-lg-4 sticky-column top-0" id="contact">
              <ContactDetail
                permission={permission}
                currentItem={currentItem}
                contactPerson={contactPerson}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
