import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiHeart, FiCamera } from "../assect/icons/vander";
import TinySlider from "tiny-slider-react";
import "../../node_modules/tiny-slider/dist/tiny-slider.css";
import "../assect/css/custom.css";

const ProprtySlider = ({ propertyData, db_index }) => {
  const settings = {
    container: ".tiny-slide-three",
    controls: true,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    controlsText: [
      '<i class="mdi mdi-chevron-left "></i>',
      '<i class="mdi mdi-chevron-right"></i>',
    ],
    nav: false,
    speed: 400,
    gutter: 0,
    responsive: {
      1025: {
        items: 3,
      },

      992: {
        items: 2,
      },

      767: {
        items: 2,
      },

      320: {
        items: 1,
      },
    },
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="tiny-slide-three">
          <TinySlider settings={settings}>
            {propertyData.map((item, index) => {
              return (
                <div className="tiny-slide" key={index}>
                  <div className="card property border-0 shadow position-relative overflow-hidden rounded-3 m-3">
                    <div className="property-image position-relative overflow-hidden shadow">
                      <img
                        src={item.images_list[0]}
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </div>
                    <div className="card-body content p-4">
                      <Link
                        to={`/detail/${db_index}/${item._id}`}
                        className="title fs-5 text-dark fw-medium truncate"
                      >
                        {item.name}
                      </Link>

                      <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                        {(db_index == 0 || db_index == 1) && (
                          <>
                            <li className="d-flex align-items-center me-3">
                              <i className="mdi mdi-arrow-expand-all fs-5 me-2 text-primary"></i>
                              <span className="text-muted">
                                {item.area_size}sqft
                              </span>
                            </li>
                            <li className="d-flex align-items-center me-3">
                              <i className="mdi mdi-view-grid fs-5 me-2 text-primary"></i>
                              <span className="text-muted">
                                {item.property_type}
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
                              <i className="mdi mdi-shower fs-5 me-2 text-primary"></i>
                              <span
                                className="text-muted truncate"
                                style={{ width: "63%" }}
                              >
                                {item.beds != "NULL" ? item.beds : ""} Beds
                              </span>
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="mdi mdi-shower fs-5 me-2 text-primary"></i>
                              <span
                                className="text-muted truncate"
                                style={{ width: "63%" }}
                              >
                                {item.bathrooms != "NULL" ? item.bathrooms : ""}
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
                            {(db_index == 0 || db_index == 2) && "/mon"}
                          </p>
                        </li>
                        {(db_index == 2 || db_index == 3) && (
                          <li className="list-inline-item mb-0">
                            <ul className="fs-6 fw-medium mb-0">{item.mrt}</ul>
                          </li>
                        )}
                        {(db_index == 0 || db_index == 1) && (
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
              );
            })}
          </TinySlider>
        </div>
      </div>
    </div>
  );
};
export default ProprtySlider;
