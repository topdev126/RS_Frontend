import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Property_types } from "./property_types";
import { Amenities } from "./amenities.js";
import { MrtGroups } from "./mrts.js";
import TextSearch from "./textSearch.js";
import SearchSubProps from "./searchSubProps.js";
import { SearchSelect } from "./searchSelect.js";
import { Districts } from "./districts";
import Spinner from "react-bootstrap/Spinner";
import { MultiSelect } from "react-multi-select-component";

import {
  FiDollarSign,
  FaMapMarkerAlt,
  FiHome,
  GiResize,
  FaBed,
  FaShower,
  FaCalendarAlt,
  FiSearch,
  FaSubway,
  FaCouch,
  FaSwimmingPool,
  FaThLarge,
  FiMap,
  FaUser,
  FaAddressCard,
} from "../assect/icons/vander";

const SearchPan = ({
  handleSearch,
  db_index,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedPropType,
  setSelectedPropType,
  selectedDistrict,
  setSelectedDistrict,
  minAreaVal,
  setMinAreaVal,
  maxAreaVal,
  setMaxAreaVal,
  selectedBeds,
  setSelectedBeds,
  selectedBaths,
  setSelectedBaths,
  selectedAmenity,
  setSelectedAmenity,
  selectedMrt,
  setSelectedMrt,
  selectedFurnishing,
  setSelectedFurnishing,
  selectedSubProperties,
  setSelectedSubProperties,
  selectedSubAmenities,
  setSelectedSubAmenities,
  selectedSubMrts,
  setSelectedSubMrts,
  subProperties,
  setSubProperties,
  subAmenities,
  setSubAmenities,
  subMrts,
  setSubMrts,
  devNameKeys,
  setDevNameKeys,
  tenureKeys,
  setTenureKeys,
  addressKeys,
  setAddressKeys,
  nameKeys,
  setNameKeys,
  wordKeys,
  setWordKeys,
  searchloading,
}) => {
  // const [searchKeywords, setSearchKeywords] = useState("");
  const [isMoreVisible, setIsMoreVisible] = useState(false); // State to toggle additional fields

  const Props = db_index < 2 ? Property_types[0] : Property_types[1];
  const BedsNums = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "1+1", label: "1+1" },
    { value: "2+1", label: "2+1" },
    { value: "3+1", label: "3+1" },
    { value: "4+1", label: "4+1" },
    { value: "5+1", label: "5+1" },
    { value: "6+1", label: "6+1" },
    { value: "7+1", label: "7+1" },
    { value: "8+1", label: "8+1" },
    { value: "9+1", label: "9+1" },
    { value: "10+1", label: "10+1" },
    { value: "Room", label: "Room" },
    { value: "Master Room", label: "Master Room" },
    { value: "Common Room", label: "Common Room" },
    { value: "Studio", label: "Studio" },
  ];
  const BathsNums = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];

  const Furnishing = [
    { value: "Bare", label: "Bare" },
    { value: "Fully", label: "Fully" },
    { value: "Fully Fitted", label: "Fully Fitted" },
    { value: "Unfurnished", label: "Unfurnished" },
    { value: "Partial", label: "Partial" },
    { value: "Partially Fitted", label: "Partially Fitted" },
  ];

  const resetSearchParams = () => {
    setMaxPrice(null);
    setMinPrice(null);
    setSelectedPropType([]);
    setSelectedAmenity([]);
    setSelectedDistrict([]);
    setMinAreaVal(null);
    setMaxAreaVal(null);
    setSelectedBaths([]);
    setSelectedBeds([]);
    setSelectedMrt([]);
    setSelectedFurnishing([]);
    // setSearchKeywords("");
    setNameKeys("");
    setWordKeys("")
    setAddressKeys("");
    setDevNameKeys("");
    setTenureKeys("");
    setSelectedSubProperties([]);
    setSelectedSubAmenities([]);
    setSelectedSubMrts([]);
  };

  const handleSubProps = (value) => {
    setSelectedSubProperties((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubAmens = (value) => {
    setSelectedSubAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const handleSubMrts = (value) => {
    setSelectedSubMrts((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const changeProps = (sel) => {
    setSelectedPropType(sel);
    setSubProperties(Props[sel.value]);
  };

  const changeAmenity = (sel) => {
    setSelectedAmenity(sel);
    setSubAmenities(Amenities[sel.value]);
  };

  const changeMrt = (sel) => {
    setSelectedMrt(sel);
    setSubMrts(MrtGroups[sel.value]);
  };

  useEffect(() => {
    resetSearchParams();
  }, [db_index]);

  return (
    <div className="mt-4">
      <div className="tab-content bg-white rounded-3 sm-rounded-0 shadow">
        <div className="card border-0 active">
          <form className="card-body text-start" onSubmit={handleSearch}>
            <div className="registration-form text-dark text-start">
              <div className="row g-lg-0">
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="mb-3">
                    <label className="form-label fs-6">Word :</label>
                    <div className="filter-search-form position-relative filter-border">
                      <FaUser className="fea icon-ex-md icons" />
                      <input
                        name="name"
                        type="text"
                        className="form-control filter-input-box bg-light border-0"
                        placeholder="Search by Any Word"
                        value={wordKeys}
                        onChange={(e) => setWordKeys(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <SearchSelect
                  labelName="District"
                  Props={Districts}
                  selectedPropType={selectedDistrict}
                  changeProps={setSelectedDistrict}
                  Icon={FaMapMarkerAlt}
                  col={3}
                />

                {/* 
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="mb-3">
                    <label className="form-label fs-6">District :</label>
                    <div className="filter-search-form position-relative filter-border bg-light">
                      <FaMapMarkerAlt className="fea icon-ex-md icons" />
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={Districts}
                        value={selectedDistrict || null}
                        onChange={setSelectedDistrict}
                      />
                    </div>
                  </div>
                </div> */}

                <div className="col-lg-3 col-md-6 col-12">
                  <div className="mb-3">
                    <label className="form-label fs-6">Min Price :</label>
                    <div className="filter-search-form position-relative filter-border bg-light">
                      <FiDollarSign className="fea icon-ex-md icons" />
                      <input
                        name="minP"
                        type="text"
                        className="form-control filter-input-box bg-light border-0"
                        value={minPrice !== null ? minPrice : ""} // Display empty if minPrice is null
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        // style={{ flex: '1' }} // Ensures the input takes available space
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <div className="mb-3">
                    <label className="form-label fs-6">Max Price :</label>
                    <div className="filter-search-form position-relative filter-border bg-light">
                      <FiDollarSign className="fea icon-ex-md icons" />
                      <input
                        name="maxP"
                        type="text"
                        className="form-control filter-input-box bg-light border-0"
                        value={maxPrice !== null ? maxPrice : ""} // Display empty if minPrice is null
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        // style={{ flex: '1' }} // Ensures the input takes available space
                      />
                    </div>
                  </div>
                </div>

                {isMoreVisible && (
                  <>
                    <SearchSelect
                      labelName="Select Propery types"
                      Props={Props.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      selectedPropType={selectedPropType}
                      changeProps={changeProps}
                      Icon={FaThLarge}
                      col={3}
                    />
                    <SearchSelect
                      labelName="Select Amentites"
                      Props={Amenities.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      selectedPropType={selectedAmenity}
                      changeProps={changeAmenity}
                      Icon={FaSwimmingPool}
                      col={3}
                    />
                    <div className="col-lg-3 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label fs-6">Min Area :</label>
                        <div className="filter-search-form position-relative filter-border bg-light">
                          <GiResize className="fea icon-ex-md icons" />
                          <input
                            name="minP"
                            type="text"
                            className="form-control filter-input-box bg-light border-0"
                            value={minAreaVal !== null ? minAreaVal : ""} // Display empty if minPrice is null
                            onChange={(e) =>
                              setMinAreaVal(Number(e.target.value))
                            }
                            // style={{ flex: '1' }} // Ensures the input takes available space
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label fs-6">Max Area :</label>
                        <div className="filter-search-form position-relative filter-border bg-light">
                          <GiResize className="fea icon-ex-md icons" />
                          <input
                            name="maxP"
                            type="text"
                            className="form-control filter-input-box bg-light border-0"
                            value={maxAreaVal !== null ? maxAreaVal : ""} // Display empty if minPrice is null
                            onChange={(e) =>
                              setMaxAreaVal(Number(e.target.value))
                            }
                            // style={{ flex: '1' }} // Ensures the input takes available space
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label fs-6">Name :</label>
                        <div className="filter-search-form position-relative filter-border">
                          <FaUser className="fea icon-ex-md icons" />
                          <input
                            name="name"
                            type="text"
                            className="form-control filter-input-box bg-light border-0"
                            placeholder="Search by Name"
                            value={nameKeys}
                            onChange={(e) => setNameKeys(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label fs-6">Address :</label>
                        <div className="filter-search-form position-relative filter-border">
                          <FiMap className="fea icon-ex-md icons" />
                          <input
                            name="name"
                            type="text"
                            className="form-control filter-input-box bg-light border-0"
                            placeholder="Search by Address"
                            value={addressKeys}
                            onChange={(e) => setAddressKeys(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label fs-6">Dev Name :</label>
                        <div className="filter-search-form position-relative filter-border">
                          <FaAddressCard className="fea icon-ex-md icons" />
                          <input
                            name="name"
                            type="text"
                            className="form-control filter-input-box bg-light border-0"
                            placeholder="Search by Development Name"
                            value={devNameKeys}
                            onChange={(e) => setDevNameKeys(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {(db_index === 2 || db_index === 3) && (
                      <>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6">Tenure :</label>
                            <div className="filter-search-form position-relative filter-border">
                              <FaCalendarAlt className="fea icon-ex-md icons" />
                              <input
                                name="name"
                                type="text"
                                className="form-control filter-input-box bg-light border-0"
                                placeholder="Search by Tenure"
                                value={tenureKeys}
                                onChange={(e) => setTenureKeys(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <SearchSelect
                          labelName="Number of Beds"
                          Props={BedsNums}
                          selectedPropType={selectedBeds}
                          changeProps={setSelectedBeds}
                          Icon={FaBed}
                          col={3}
                        />
                        <SearchSelect
                          labelName="Number of Baths"
                          Props={BathsNums}
                          selectedPropType={selectedBaths}
                          changeProps={setSelectedBaths}
                          Icon={FaShower}
                          col={3}
                        />
                      </>
                    )}

                    {(db_index === 2 || db_index === 3) && (
                      <>
                        <SearchSelect
                          labelName="Select MRT"
                          Props={MrtGroups.map((item) => ({
                            value: item,
                            label: item,
                          }))}
                          selectedPropType={selectedMrt}
                          changeProps={changeMrt}
                          Icon={FaSubway}
                          col={3}
                        />
                        <SearchSelect
                          labelName="Select Furnishing"
                          Props={Furnishing}
                          selectedPropType={selectedFurnishing}
                          changeProps={setSelectedFurnishing}
                          Icon={FaCouch}
                          col={3}
                        />
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="col-12 d-flex justify-content-between align-items-center">
                <div className="d-flex me-auto">
                  <button
                    type="button"
                    style={{ color: "black", backgroundColor: "#38bdf8" }}
                    className="btn me-2 py-2 px-4"
                    onClick={() => setIsMoreVisible(!isMoreVisible)}
                  >
                    {isMoreVisible ? "Less" : "More"}
                  </button>
                  <button
                    type="button"
                    style={{ color: "black", backgroundColor: "#38bdf8" }}
                    className="btn me-2 py-2 px-4"
                    onClick={() => resetSearchParams()}
                  >
                    Reset
                  </button>
                </div>
                <button
                  type="submit"
                  id="search"
                  name="search"
                  style={{
                    color: "black",
                    backgroundColor: "#16a34a",
                    width: "100px", // Set a fixed width
                    textAlign: "center", // Center the content
                  }}
                  className="btn searchbtn py-2 px-4"
                  disabled={searchloading}
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
                    "Search"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchPan;
