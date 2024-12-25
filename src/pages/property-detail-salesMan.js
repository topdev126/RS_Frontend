import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import ProprtySlider from "../components/propertySlider";
import ContactDetail from "../components/contactDetail";
import { Districts } from "../components/districts";
import { MrtGroups } from "../components/mrts";
import { Amenities } from "../components/amenities.js";
import { Property_types } from "../components/property_types";
import TinySlider from "tiny-slider-react";
import "../../node_modules/tiny-slider/dist/tiny-slider.css";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { Districts_Arr as districts } from "../components/districts";
import RealEstateMap from "./myMap";
import { SelectOne, SearchSelect } from "../components/searchSelect";
import { toast } from "react-toastify";
import { handleRemoveElement, setFavorite } from "../components/helper.js";
import { FaSwimmingPool } from "../assect/icons/vander";

export default function PropertyDetailsTwo() {
  const labels = [
    "Commercial | Rent",
    "Commercial | Sale",
    "Residential | Rent",
    "Residential | Sale",
  ];
  const Furnishing = [
    { value: "Bare", label: "Bare" },
    { value: "Fully", label: "Fully" },
    { value: "Fully Fitted", label: "Fully Fitted" },
    { value: "Unfurnished", label: "Unfurnished" },
    { value: "Partial", label: "Partial" },
    { value: "Partially Fitted", label: "Partially Fitted" },
  ];
  const params = useParams();
  const id = params.id;
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);
  const [contactPerson, setContactPerson] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerHeight);
  const [permission, setPermission] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState({
    value: labels[params.idb],
    label: labels[params.idb],
  });
  const [selectedPropType, setSelectedPropType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedFurnishing, setSelectedFurnishing] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [selectedMrt, setSelectedMrt] = useState("");
  const [selectedBeds, setSelectedBeds] = useState("");
  const [selectedBaths, setSelectedBaths] = useState("");
  const [selectedTenure, setSelectedTenure] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

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
      .then(({ status, data }) => {
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
        setSelectedDistrict({
          value: data.detail.district,
          label: data.detail.district,
        });
        setSelectedPropType({
          value: data.detail.property_type,
          label: data.detail.property_type,
        });
        setSelectedFurnishing({
          value: data.detail.furnishing,
          label: data.detail.furnishing,
        });
        setSelectedPrice(data.detail.price);
        setSelectedArea(data.detail.area_size);
        setSelectedAddress(data.detail.address);
        setSelectedName(data.detail.name);
        setSelectedBeds(data.detail.beds);
        setSelectedBaths(data.detail.bathrooms);
        setSelectedDescription(data.detail.description);
        setSelectedTenure(data.detail.tenure);
        // setSelectedAmenities(data.detail.amenities_list);
        setSelectedAmenities(
          data.detail.amenities_list.map((item) => ({
            value: item,
            label: item,
          }))
        );
        setSelectedMrt({
          value: data.detail.mrt,
          label: data.detail.mrt,
        });
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

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);

    setSelectedDistrict({
      value: currentItem.district,
      label: currentItem.district,
    });
    setSelectedPropType({
      value: currentItem.property_type,
      label: currentItem.property_type,
    });
    setSelectedFurnishing({
      value: currentItem.furnishing,
      label: currentItem.furnishing,
    });
    setSelectedMrt({
      value: currentItem.mrt,
      label: currentItem.mrt,
    });
    setSelectedAmenities(
      currentItem.amenities_list.map((item) => ({
        value: item,
        label: item,
      }))
    );    
  };

  const handleSave = async () => {
    setIsEditing(false);

    currentItem.price = selectedPrice;
    currentItem.area_size = selectedArea;
    currentItem.name = selectedName;
    currentItem.description = selectedDescription;
    currentItem.district = selectedDistrict.value;
    currentItem.furnishing = selectedFurnishing.value;
    currentItem.property_type = selectedPropType.value;
    currentItem.beds = selectedBeds ? selectedBeds : currentItem.beds;
    currentItem.bathrooms = selectedBaths
      ? selectedBaths
      : currentItem.bathrooms;
    currentItem.tenure = selectedTenure ? selectedTenure : currentItem.tenure;
    currentItem.mrt = selectedMrt ? selectedMrt.value : currentItem.mrt;
    currentItem.amenities_list = selectedAmenities.length>0? selectedAmenities.map(item=>item.value) : currentItem.amenities_list;

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/updateItem/${params.idb}/${currentItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentItem),
        }
      );

      if (response.ok) {
        toast.success("Successfully Updated");
      }
    } catch (error) {
      toast.error("Failed Updating");
      console.error("Error updating item:", error);
    }

    // Update currentItem or send data to backend here if required
  };

  const handleInputChange = (e, setFunc) => {
    setFunc(e.target.value);
  };
  const deleteList = async (id) => {
    const payload = {
      list_id: id,
      user_id: currentUser._id,
      cate: params.idb,
    };
    fetch(`${apiUrl}/api/admin/deleteList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleRemoveAmenities = (index) => {
    setSelectedAmenities(selectedAmenities.filter((_, i) => i !== index));
  };
  const changeAmenity = (sel) => {
    setSelectedAmenities(sel);
  };
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
              <div className="container mt-5 title-heading text-center">
                <h5 className="heading fw-semibold mb-0 sub-heading title-dark py-4">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      className="form-control text-center fs-4"
                      value={selectedName}
                      // style={{ width: "300px", textAlign: "center" }}
                      onChange={(e) => handleInputChange(e, setSelectedName)}
                    />
                  ) : (
                    currentItem.name
                  )}
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
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="rounded-3 shadow-lg bg-white sticky-bar p-4">
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
                        {selectedLabel
                          ? selectedLabel.value
                          : labels[params.idb]}
                      </span>
                    </div>

                    <hr
                      style={{ border: "1px solid #ccc", margin: "10px 0" }}
                    />

                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th
                            className="small table-header"
                            style={{ width: "30%" }}
                          >
                            Label
                          </th>
                          <td className="small" style={{ width: "70%" }}>
                            <SelectOne
                              onChange={setSelectedLabel}
                              options={labels.map((item) => ({
                                value: item,
                                label: item,
                              }))}
                              selectedOption={
                                selectedLabel ? selectedLabel : ""
                              }
                              // disabled={isEditing ? false : true}
                              disabled={true}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th
                            className="small table-header"
                            style={{ width: "30%" }}
                          >
                            Property Type
                          </th>
                          <td className="small" style={{ width: "70%" }}>
                            <SelectOne
                              onChange={setSelectedPropType}
                              options={
                                selectedLabel
                                  ? Property_types[
                                      Math.floor(
                                        labels.indexOf(selectedLabel.value) / 2
                                      )
                                    ].map((item) => ({
                                      value: item,
                                      label: item,
                                    }))
                                  : ""
                              }
                              selectedOption={
                                selectedPropType ? selectedPropType : ""
                              }
                              disabled={!isEditing || !selectedLabel}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th
                            className="small table-header"
                            style={{ width: "30%" }}
                          >
                            Price
                          </th>
                          <td className="small" style={{ width: "70%" }}>
                            {isEditing ? (
                              <input
                                type="text"
                                name="price"
                                className="form-control"
                                value={selectedPrice}
                                onChange={(e) =>
                                  handleInputChange(e, setSelectedPrice)
                                }
                              />
                            ) : (
                              // `$${parseInt(
                              //   selectedPrice
                              // ).toLocaleString()}`
                              selectedPrice
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th
                            className="small table-header"
                            style={{ width: "30%" }}
                          >
                            Address
                          </th>
                          <td className="small" style={{ width: "70%" }}>
                            {isEditing ? (
                              <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={selectedAddress}
                                onChange={(e) =>
                                  handleInputChange(e, setSelectedAddress)
                                }
                              />
                            ) : (
                              currentItem.address
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th
                            className="small table-header"
                            style={{ width: "30%" }}
                          >
                            District
                          </th>
                          <td className="small" style={{ width: "70%" }}>
                            <SelectOne
                              onChange={setSelectedDistrict}
                              options={Districts}
                              selectedOption={
                                selectedDistrict
                                  ? Districts.find(
                                      (item) =>
                                        item.value === selectedDistrict.value
                                    )
                                  : ""
                              }
                              disabled={isEditing ? false : true}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th
                            className="small table-header"
                            style={{ width: "30%" }}
                          >
                            Furnishing
                          </th>
                          <td className="small" style={{ width: "70%" }}>
                            <SelectOne
                              onChange={setSelectedFurnishing}
                              options={Furnishing}
                              selectedOption={
                                selectedFurnishing
                                  ? Furnishing.find(
                                      (item) =>
                                        item.value === selectedFurnishing.value
                                    )
                                  : ""
                              }
                              disabled={isEditing ? false : true}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th
                            className="small table-header"
                            style={{ width: "30%" }}
                          >
                            Area (sqft)
                          </th>
                          <td className="small" style={{ width: "70%" }}>
                            {isEditing ? (
                              <input
                                type="text"
                                name="area_size"
                                className="form-control"
                                value={selectedArea}
                                onChange={(e) =>
                                  handleInputChange(e, setSelectedArea)
                                }
                              />
                            ) : (
                              parseInt(currentItem.area_size).toLocaleString()
                            )}
                          </td>
                        </tr>
                        {params.idb > 1 && (
                          <>
                            <tr>
                              <th
                                className="small table-header"
                                style={{ width: "30%" }}
                              >
                                Beds
                              </th>
                              <td className="small" style={{ width: "70%" }}>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    name="beds"
                                    className="form-control"
                                    value={selectedBeds}
                                    onChange={(e) =>
                                      handleInputChange(e, setSelectedBeds)
                                    }
                                  />
                                ) : (
                                  currentItem.beds
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th
                                className="small table-header"
                                style={{ width: "30%" }}
                              >
                                Baths
                              </th>
                              <td className="small" style={{ width: "70%" }}>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    name="baths"
                                    className="form-control"
                                    value={selectedBaths}
                                    onChange={(e) =>
                                      handleInputChange(e, setSelectedBaths)
                                    }
                                  />
                                ) : (
                                  currentItem.bathrooms
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th
                                className="small table-header"
                                style={{ width: "30%" }}
                              >
                                Tenure
                              </th>
                              <td className="small" style={{ width: "70%" }}>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    name="Tenure"
                                    className="form-control"
                                    value={selectedTenure}
                                    onChange={(e) =>
                                      handleInputChange(e, setSelectedTenure)
                                    }
                                  />
                                ) : (
                                  currentItem.tenure
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th
                                className="small table-header"
                                style={{ width: "30%" }}
                              >
                                Mrt
                              </th>
                              <td className="small" style={{ width: "70%" }}>
                                <SelectOne
                                  onChange={setSelectedMrt}
                                  options={MrtGroups.map((item) => ({
                                    value: item,
                                    label: item,
                                  }))}
                                  selectedOption={
                                    selectedMrt ? selectedMrt : ""
                                  }
                                  disabled={isEditing ? false : true}
                                />
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>

                    <hr
                      style={{ border: "1px solid #ccc", margin: "10px 0" }}
                    />
                    <div className="mb-5">
                    {selectedAmenities ? (
                      <div className="d-flex flex-column align-items-center mt-2">
                        {!isEditing && <span className="fs-3 text-center mb-2">Amenities</span>}
                        {isEditing && (
                          <SearchSelect
                            labelName={"Amenities"}
                            Props={Amenities.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            selectedPropType={
                              selectedAmenities ? selectedAmenities : ""
                            }
                            changeProps={changeAmenity}
                            Icon={FaSwimmingPool}
                            col={9}
                          />
                        )}
                        <div className="d-flex flex-wrap gap-2">
                          {selectedAmenities
                            .map((ele) => ele.value)
                            .map((item, index) => (
                              <span
                                key={index}
                                className="badge bg-light text-dark small d-flex align-items-center"
                                style={{ color: "#1f1f1f", marginRight: "8px" }}
                              >
                                {item}
                                {isEditing && (
                                  <button
                                    type="button"
                                    className="btn-close btn-close-sm ms-2 p-0"
                                    onClick={() => handleRemoveAmenities(index)} // Ensure handleRemoveItem is implemented
                                    aria-label="Remove"
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      color: "#1f1f1f",
                                      fontSize: "0.75rem", // Smaller icon size
                                      transition: "color 0.3s",
                                    }}
                                    onMouseEnter={(e) =>
                                      (e.target.style.color = "#ff6b6b")
                                    } // Hover color change
                                    onMouseLeave={(e) =>
                                      (e.target.style.color = "#1f1f1f")
                                    } // Reset color
                                  />
                                )}
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

                    <div className="d-flex justify-content-between mt-3">
                      {isEditing ? (
                        <>
                          <button
                            className="btn btn-secondary me-2 w-50"
                            onClick={handleCancel}
                            aria-label="Cancel Editing"
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-success w-50"
                            onClick={handleSave}
                            aria-label="Save Changes"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="d-flex">
                            <button
                              className="btn btn-primary me-2"
                              onClick={() =>
                                setFavorite(
                                  currentItem._id,
                                  currentUser._id,
                                  params.idb
                                )
                              }
                              aria-label="Remove Item"
                            >
                              Favorite
                            </button>
                            <button
                              className="btn btn-danger me-2"
                              onClick={() =>
                                handleRemoveElement(
                                  currentItem._id,
                                  deleteList,
                                  "Post"
                                )
                              }
                              aria-label="Remove Item"
                            >
                              Remove
                            </button>
                          </div>
                          <button
                            className="btn btn-success px-4"
                            onClick={handleEdit}
                            aria-label="Edit Item"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <p className="justify-content-center px-3 py-3" id="description">
                {isEditing ? (
                  <textarea
                    value={selectedDescription}
                    onChange={(e) =>
                      handleInputChange(e, setSelectedDescription)
                    }
                    className="w-100 border border-success p-2"
                    style={{ minHeight: "150px" }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentItem.description,
                    }}
                  />
                )}
              </p>
              <div className="container my-4" id="map">
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
