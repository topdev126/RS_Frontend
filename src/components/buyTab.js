import React, { useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../assect/images/svg/Agent_Monochromatic.svg";
import image2 from "../assect/images/svg/presentation_Flatline.svg";
import image3 from "../assect/images/svg/session_Flatline.svg";
import image4 from "../assect/images/svg/Startup_Flatline.svg";
import image5 from "../assect/images/svg/team_Flatline.svg";
import image6 from "../assect/images/svg/Team_meeting_Two.svg";

import { FiArrowRight } from "../assect/icons/vander";

export default function BuyTab() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="row g-4">
        <div className="col-md-4">
          <ul
            className="nav nav-pills nav-justified flex-column bg-white rounded-3 shadow p-3 mb-0 sticky-bar"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item">
              <Link
                to="#"
                className={`${
                  activeIndex === 0 ? "active" : ""
                } nav-link rounded-3`}
                onClick={() => setActiveIndex(0)}
              >
                <div className="text-center pt-1 pb-1">
                  <h6 className="title fw-normal mb-0">Pre Approval Letter</h6>
                </div>
              </Link>
            </li>

            <li className="nav-item mt-2">
              <Link
                to="#"
                className={`${
                  activeIndex === 1 ? "active" : ""
                } nav-link rounded-3`}
                onClick={() => setActiveIndex(1)}
              >
                <div className="text-center pt-1 pb-1">
                  <h6 className="title fw-normal mb-0">Schedule a Showing</h6>
                </div>
              </Link>
            </li>

            <li className="nav-item mt-2">
              <Link
                to="#"
                className={`${
                  activeIndex === 2 ? "active" : ""
                } nav-link rounded-3`}
                onClick={() => setActiveIndex(2)}
              >
                <div className="text-center pt-1 pb-1">
                  <h6 className="title fw-normal mb-0">Submit an Offer</h6>
                </div>
              </Link>
            </li>

            <li className="nav-item mt-2">
              <Link
                to="#"
                className={`${
                  activeIndex === 3 ? "active" : ""
                } nav-link rounded-3`}
                onClick={() => setActiveIndex(3)}
              >
                <div className="text-center pt-1 pb-1">
                  <h6 className="title fw-normal mb-0">Property Inspection</h6>
                </div>
              </Link>
            </li>

            <li className="nav-item mt-2">
              <Link
                to="#"
                className={`${
                  activeIndex === 4 ? "active" : ""
                } nav-link rounded-3`}
                onClick={() => setActiveIndex(4)}
              >
                <div className="text-center pt-1 pb-1">
                  <h6 className="title fw-normal mb-0">Appraisal</h6>
                </div>
              </Link>
            </li>

            <li className="nav-item mt-2">
              <Link
                to="#"
                className={`${
                  activeIndex === 5 ? "active" : ""
                } nav-link rounded-3`}
                onClick={() => setActiveIndex(5)}
              >
                <div className="text-center pt-1 pb-1">
                  <h6 className="title fw-normal mb-0">Closing Deal</h6>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-md-8 col-12">
          <div className="tab-content">
            {activeIndex === 0 ? (
              <div className="bg-white show active">
                <img src={image1} className="img-fluid" alt="" />
                <div className="mt-4">
                  <h5 className="">Pre Approval Letter</h5>
                  <p className="text-muted">
                    Most buyers think the first step is finding their dream
                    house, but the truth is finding the funding is the first
                    step. Pro 2 streamlines the Loan Pre-Approval process with
                    our ecosystem of Premier Partners or simply upload your own
                    Pre-Approval letter.
                  </p>
                  <Link to="#" className="text-primary">
                    See More
                    <FiArrowRight className="fea icon-sm ms-1" />
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            {activeIndex === 1 ? (
              <div className="bg-white show active">
                <img src={image2} className="img-fluid" alt="" />
                <div className="mt-4">
                  <h5 className="">Pre Approval Letter</h5>
                  <p className="text-muted">
                    Most buyers think the first step is finding their dream
                    house, but the truth is finding the funding is the first
                    step. Pro-2 streamlines the Loan Pre-Approval process with
                    our ecosystem of Premier Partners or simply upload your own
                    Pre-Approval letter.
                  </p>
                  <Link to="#" className="text-primary">
                    See More <FiArrowRight className="fea icon-sm ms-1" />
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            {activeIndex === 2 ? (
              <div className="bg-white show active">
                <img src={image3} className="img-fluid" alt="" />
                <div className="mt-4">
                  <h5 className="">Pre Approval Letter</h5>
                  <p className="text-muted">
                    Most buyers think the first step is finding their dream
                    house, but the truth is finding the funding is the first
                    step. Pro 2 streamlines the Loan Pre-Approval process with
                    our ecosystem of Premier Partners or simply upload your own
                    Pre-Approval letter.
                  </p>
                  <Link to="#" className="text-primary">
                    See More <FiArrowRight className="fea icon-sm ms-1" />
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            {activeIndex === 3 ? (
              <div className="bg-white show active">
                <img src={image4} className="img-fluid" alt="" />
                <div className="mt-4">
                  <h5 className="">Pre Approval Letter</h5>
                  <p className="text-muted">
                    Most buyers think the first step is finding their dream
                    house, but the truth is finding the funding is the first
                    step. Pro-2 streamlines the Loan Pre-Approval process with
                    our ecosystem of Premier Partners or simply upload your own
                    Pre-Approval letter.
                  </p>
                  <Link to="#" className="text-primary">
                    See More <FiArrowRight className="fea icon-sm ms-1" />
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            {activeIndex === 4 ? (
              <div className="bg-white show active">
                <img src={image5} className="img-fluid" alt="" />
                <div className="mt-4">
                  <h5 className="">Pre Approval Letter</h5>
                  <p className="text-muted">
                    Most buyers think the first step is finding their dream
                    house, but the truth is finding the funding is the first
                    step. Pro-2 streamlines the Loan Pre-Approval process with
                    our ecosystem of Premier Partners or simply upload your own
                    Pre-Approval letter.
                  </p>
                  <Link to="#" className="text-primary">
                    See More <FiArrowRight className="fea icon-sm ms-1" />
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            {activeIndex === 5 ? (
              <div className="bg-white show active">
                <img src={image6} className="img-fluid" alt="" />
                <div className="mt-4">
                  <h5 className="">Pre Approval Letter</h5>
                  <p className="text-muted">
                    Most buyers think the first step is finding their dream
                    house, but the truth is finding the funding is the first
                    step. Pro-2 streamlines the Loan Pre-Approval process with
                    our ecosystem of Premier Partners or simply upload your own
                    Pre-Approval letter.
                  </p>
                  <Link to="#" className="text-primary">
                    See More <FiArrowRight className="fea icon-sm ms-1" />
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
