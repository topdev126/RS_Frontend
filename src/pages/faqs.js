import React, { useState } from "react";
import { Link as Link2 } from "react-scroll";

import Navbar from "../components/navbar";
import bg3 from "../assect/images/bg/03.jpg";
import Footer from "../components/footer";

export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeIndex1, setActiveIndex1] = useState(1);
  const [activeIndex2, setActiveIndex2] = useState(1);
  const [activeIndex3, setActiveIndex3] = useState(1);
  const accordianData = [
    {
      id: 1,
      title: "How does it work ?",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
    },
    {
      id: 2,
      title: "Do I need a designer to use Pro-2 ?",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
    },
    {
      id: 3,
      title: "What do I need to do to start selling ?",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
    },
    {
      id: 4,
      title: "What happens when I receive an order ?",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
    }
  ];
  return (
    <>
      <Navbar
        navClass="defaultscroll sticky"
        logolight={true}
        menuClass="navigation-menu nav-left nav-light"
      />
      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <p className="text-white-50 para-desc mx-auto mb-0">
                  Questions & Answers
                </p>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Frequently Asked Questions
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
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-5 col-12 d-none d-md-block">
              <div className="rounded-3 shadow p-4 sticky-bar">
                <ul
                  className="list-unstyled sidebar-nav mb-0 py-0"
                  id="navmenu-nav"
                >
                  <li className="navbar-item p-0">
                    <Link2
                      to="tech"
                      spy={true}
                      activeclassname="active"
                      smooth={true}
                      duration={500}
                      className="h6 text-dark navbar-link"
                    >
                      Buying Questions
                    </Link2>
                  </li>
                  <li className="navbar-item mt-3 p-0">
                    <Link2
                      to="general"
                      spy={true}
                      activeclassname="active"
                      smooth={true}
                      duration={500}
                      className="h6 text-dark navbar-link"
                    >
                      General Questions
                    </Link2>
                  </li>
                  <li className="navbar-item mt-3 p-0">
                    <Link2
                      to="payment"
                      spy={true}
                      activeclassname="active"
                      smooth={true}
                      duration={500}
                      className="h6 text-dark navbar-link"
                    >
                      Payments Questions
                    </Link2>
                  </li>
                  <li className="navbar-item mt-3 p-0">
                    <Link2
                      to="support"
                      spy={true}
                      activeclassname="active"
                      smooth={true}
                      duration={500}
                      className="h6 text-dark navbar-link"
                    >
                      Support Questions
                    </Link2>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-8 col-md-7 col-12">
              <div id="tech">
                <div className="section-title">
                  <h4>Buying Product</h4>
                </div>

                <div className="accordion mt-4 pt-2" id="buyingquestion">
                  {accordianData.map((item, index) => {
                    return (
                      <div
                        className="accordion-item rounded-3 mb-3"
                        key={index}
                      >
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className={`accordion-button border-0 bg-light ${
                              activeIndex === item.id ? "active" : ""
                            }`}
                            onClick={() => setActiveIndex(item.id)}
                          >
                            {item.title}
                          </button>
                        </h2>
                        {activeIndex === item.id && (
                          <div
                            id="collapseOne"
                            className="accordion-collapse border-0"
                          >
                            <div className="accordion-body text-muted">
                              {item.desc}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div id="general">
                <div className="section-title mt-5">
                  <h4>General Questions</h4>
                </div>

                <div className="accordion mt-4 pt-2" id="generalquestion">
                  {accordianData.map((item, index) => {
                    return (
                      <div
                        className="accordion-item rounded-3 mb-3"
                        key={index}
                      >
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className={`accordion-button border-0 bg-light ${
                              activeIndex1 === item.id ? "active" : ""
                            }`}
                            onClick={() => setActiveIndex1(item.id)}
                          >
                            {item.title}
                          </button>
                        </h2>
                        {activeIndex1 === item.id && (
                          <div
                            id="collapseOne"
                            className="accordion-collapse border-0"
                          >
                            <div className="accordion-body text-muted">
                              {item.desc}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div id="payment">
                <div className="section-title mt-5">
                  <h4>Payments Questions</h4>
                </div>

                <div className="accordion mt-4 pt-2" id="paymentquestion">
                  {accordianData.map((item, index) => {
                    return (
                      <div
                        className="accordion-item rounded-3 mb-3"
                        key={index}
                      >
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className={`accordion-button border-0 bg-light ${
                              activeIndex2 === item.id ? "active" : ""
                            }`}
                            onClick={() => setActiveIndex2(item.id)}
                          >
                            {item.title}
                          </button>
                        </h2>
                        {activeIndex2 === item.id && (
                          <div
                            id="collapseOne"
                            className="accordion-collapse border-0"
                          >
                            <div className="accordion-body text-muted">
                              {item.desc}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div id="support">
                <div className="section-title mt-5">
                  <h4>Support Questions</h4>
                </div>

                <div className="accordion mt-4 pt-2" id="supportquestion">
                  {accordianData.map((item, index) => {
                    return (
                      <div
                        className="accordion-item rounded-3 mb-3"
                        key={index}
                      >
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className={`accordion-button border-0 bg-light ${
                              activeIndex3 === item.id ? "active" : ""
                            }`}
                            onClick={() => setActiveIndex3(item.id)}
                          >
                            {item.title}
                          </button>
                        </h2>
                        {activeIndex3 === item.id && (
                          <div
                            id="collapseOne"
                            className="accordion-collapse border-0"
                          >
                            <div className="accordion-body text-muted">
                              {item.desc}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
