import React from "react";
import { Link, useParams } from "react-router-dom";

import bg2 from "../assect/images/bg/02.jpg";
import client1 from "../assect/images/client/01.jpg";
import client2 from "../assect/images/client/02.jpg";
import client3 from "../assect/images/client/03.jpg";
import client4 from "../assect/images/client/04.jpg";
import image1 from "../assect/images/property/1.jpg";
import image2 from "../assect/images/property/2.jpg";
import image3 from "../assect/images/property/3.jpg";

import Navbar from "../components/navbar";
import { blogData } from "../data/data";
import Footer from "../components/footer";

export default function BlogDetail() {
  const params = useParams();
  const id = params.id;

  const data = blogData.find((blog) => blog.id === parseInt(id));

  const resentData = [
    {
      image: image1,
      title: "Consultant Business",
      date: "13th March 2023",
    },
    {
      image: image2,
      title: "Grow Your Business",
      date: "5th May 2023",
    },
    {
      image: image3,
      title: "Look On The Glorious Balance",
      date: "19th June 2023",
    },
  ];
  const commentsData = [
    {
      image: client1,
      name: "Lorenzo Peterson",
      date: "20th June,2023 at 01:30pm",
      desc: '" There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour "',
    },
    {
      image: client2,
      name: "Tammy Camacho",
      date: "31st Aug,2023 at 01:45pm",
      desc: '" There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour "',
    },
    {
      image: client3,
      name: "Tammy Camacho",
      date: "1st Sep,2023 at 02:00pm",
      desc: '" There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour "',
    },
    {
      image: client4,
      name: "Lorenzo Peterson",
      date: "29th Dec,2023 at 01:30pm",
      desc: '" There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour "',
    },
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
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <span className="badge bg-primary">Pro-2</span>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark mt-4">
                  {data?.title
                    ? data?.title
                    : "Skills That You Can Learn In The Real Estate Market"}
                </h5>

                <ul className="list-inline text-center mb-0">
                  <li className="list-inline-item mx-4 mt-4">
                    <span className="text-white-50 d-block">Author</span>
                    <Link to="#" className="text-white title-dark">
                      Christina Gonzalez
                    </Link>
                  </li>

                  <li className="list-inline-item mx-4 mt-4">
                    <span className="text-white-50 d-block">Date</span>
                    <span className="text-white title-dark">
                      {data?.date ? data?.date : "15th April 2021"}
                    </span>
                  </li>

                  <li className="list-inline-item mx-4 mt-4">
                    <span className="text-white-50 d-block">Read Time</span>
                    <span className="text-white title-dark">8 min read</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="position-middle-bottom">
            <nav aria-label="breadcrumb" className="d-block">
              <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                <li className="breadcrumb-item">
                  <Link to="/">Pro 2</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/">Blog</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Blog Details
                </li>
              </ul>
            </nav>
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
            <div className="col-lg-8 col-md-7">
              <div className="card border-0 shadow rounded-3 overflow-hidden">
                <img
                  src={data?.image ? data?.image : image1}
                  className="img-fluid"
                  alt=""
                />

                <div className="card-body">
                  <ul className="list-unstyled">
                    <li className="list-inline-item">
                      <span className="d-flex align-items-center me-2">
                        <i className="mdi mdi-arrow-expand-all fs-5 me-2 text-primary"></i>
                        <span className="text-muted">8000sqf</span>
                      </span>
                    </li>

                    <li className="list-inline-item">
                      <span className="d-flex align-items-center me-2">
                        <i className="mdi mdi-bed fs-5 me-2 text-primary"></i>
                        <span className="text-muted">4 Beds</span>
                      </span>
                    </li>

                    <li className="list-inline-item">
                      <span className="d-flex align-items-center">
                        <i className="mdi mdi-shower fs-5 me-2 text-primary"></i>
                        <span className="text-muted">4 Baths</span>
                      </span>
                    </li>
                  </ul>

                  <p className="text-muted">
                    The most well-known dummy text is the 'Lorem Ipsum', which
                    is said to have originated in the 16th century. Lorem Ipsum
                    is composed in a pseudo-Latin language which more or less
                    corresponds to 'proper' Latin. It contains a series of real
                    Latin words. This ancient dummy text is also
                    incomprehensible, but it imitates the rhythm of most
                    European languages in Latin script. The advantage of its
                    Latin origin and the relative meaninglessness of Lorum Ipsum
                    is that the text does not attract attention to itself or
                    distract the viewer's attention from the layout.
                  </p>
                  <p className="text-muted">
                    Thus, Lorem Ipsum has only limited suitability as a visual
                    filler for German texts. If the fill text is intended to
                    illustrate the characteristics of different typefaces, it
                    sometimes makes sense to select texts containing the various
                    letters and symbols specific to the output language.
                  </p>

                  <blockquote className="text-center mx-auto blockquote">
                    <i className="mdi mdi-format-quote-open mdi-48px text-muted opacity-2 d-block"></i>{" "}
                    The man who comes back through the door in the wall will
                    never be quite the same as the man who went out.{" "}
                    <small className="d-block text-muted mt-2">
                      - Pro 2 Template
                    </small>
                  </blockquote>

                  <p className="text-muted">
                    There is now an abundance of readable dummy texts. These are
                    usually used when a text is required purely to fill a space.
                    These alternatives to the classic Lorem Ipsum texts are
                    often amusing and tell short, funny or nonsensical stories.
                  </p>

                  <Link to="#" className="badge badge-link bg-primary ms-1">
                    Minimal
                  </Link>
                  <Link to="#" className="badge badge-link bg-primary ms-1">
                    Interior
                  </Link>
                  <Link to="#" className="badge badge-link bg-primary ms-1">
                    Furniture
                  </Link>
                </div>
              </div>

              <div className="card shadow rounded-3 border-0 mt-4">
                <div className="card-body">
                  <h5 className="card-title mb-0">Comments :</h5>

                  <ul className="media-list list-unstyled mb-0">
                    {commentsData.map((item, index) => {
                      return (
                        <li className="mt-4" key={index}>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <Link className="pe-3" to="#">
                                <img
                                  src={item.image}
                                  className="img-fluid avatar avatar-md-sm rounded-circle shadow"
                                  alt="img"
                                />
                              </Link>
                              <div className="commentor-detail">
                                <h6 className="mb-0">
                                  <Link
                                    to="#"
                                    className="text-dark media-heading"
                                  >
                                    {item.name}
                                  </Link>
                                </h6>
                                <small className="text-muted">
                                  {item.date}
                                </small>
                              </div>
                            </div>
                            <Link to="#" className="text-muted">
                              <i className="mdi mdi-reply"></i> Reply
                            </Link>
                          </div>
                          <div className="mt-3">
                            <p className="text-muted fst-italic p-3 bg-light rounded-3">
                              {item.desc}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="card shadow rounded-3 mt-4">
                <div className="card-body">
                  <h5 className="card-title mb-0">Leave A Comment :</h5>

                  <form className="mt-4">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Your Comment</label>
                          <textarea
                            id="message"
                            placeholder="Your Comment"
                            rows="5"
                            name="message"
                            className="form-control"
                            required=""
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            required=""
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Your Email <span className="text-danger">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="form-control"
                            required=""
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="send d-grid">
                          <button type="submit" className="btn btn-primary">
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="card shadow rounded-3 mt-4">
                <div className="card-body">
                  <h5 className="card-title mb-0">Related News :</h5>

                  <div className="row g-4 mt-0">
                    {blogData.slice(0, 2).map((item, index) => {
                      return (
                        <div className="col-lg-6" key={index}>
                          <div className="card blog blog-primary shadow rounded-3 overflow-hidden border-0">
                            <div className="card-img blog-image position-relative overflow-hidden rounded-0">
                              <div className="position-relative overflow-hidden">
                                <img
                                  src={item.image}
                                  className="img-fluid"
                                  alt=""
                                />
                                <div className="card-overlay"></div>
                              </div>

                              <div className="blog-tag p-3">
                                <Link to="" className="badge bg-primary">
                                  {item.tag}
                                </Link>
                              </div>
                            </div>

                            <div className="card-body content p-0">
                              <div className="p-4">
                                <Link
                                  to={`/blog-detail/${item.id}`}
                                  className="title fw-medium fs-5 text-dark"
                                >
                                  {item.title}
                                </Link>
                                <p className="text-muted mt-2">{item.desc}</p>

                                <Link to="" className="text-dark read-more">
                                  Read More{" "}
                                  <i className="mdi mdi-chevron-right align-middle"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <div className="card bg-white p-4 rounded-3 shadow sticky-bar">
                <div>
                  <h6 className="pt-2 pb-2 bg-light rounded-3 text-center">
                    Search
                  </h6>

                  <div className="search-bar mt-4">
                    <div id="itemSearch2" className="menu-search mb-0">
                      <form
                        role="search"
                        method="get"
                        id="searchItemform2"
                        className="searchform"
                      >
                        <input
                          type="text"
                          className="form-control rounded-3 border"
                          name="s"
                          id="searchItem2"
                          placeholder="Search..."
                        />
                        <input
                          type="submit"
                          id="searchItemsubmit2"
                          value="Search"
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-2">
                  <h6 className="pt-2 pb-2 bg-light rounded-3 text-center">
                    Recent Post
                  </h6>
                  <div className="mt-4">
                    {resentData.map((item, index) => {
                      return (
                        <div
                          className="blog blog-primary d-flex align-items-center"
                          key={index}
                        >
                          <img
                            src={item.image}
                            className="avatar avatar-small rounded-3"
                            style={{ width: "auto" }}
                            alt=""
                          />
                          <div className="flex-1 ms-3">
                            <Link
                              to=""
                              className="d-block title text-dark fw-medium"
                            >
                              {item.title}
                            </Link>
                            <span className="text-muted small">
                              {item.date}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-2 text-center">
                  <h6 className="pt-2 pb-2 bg-light rounded-3">Tags Cloud</h6>
                  <ul className="tagcloud list-unstyled mt-4">
                    <li className="list-inline-item m-1">
                      <Link
                        to="#"
                        className="rounded-3 fw-medium text-dark inline-block py-2 px-3"
                      >
                        Business
                      </Link>
                    </li>
                    <li className="list-inline-item m-1">
                      <Link
                        to="#"
                        className="rounded-3 fw-medium text-dark inline-block py-2 px-3"
                      >
                        Finance
                      </Link>
                    </li>
                    <li className="list-inline-item m-1">
                      <Link
                        to="#"
                        className="rounded-3 fw-medium text-dark inline-block py-2 px-3"
                      >
                        Marketing
                      </Link>
                    </li>
                    <li className="list-inline-item m-1">
                      <Link
                        to="#"
                        className="rounded-3 fw-medium text-dark inline-block py-2 px-3"
                      >
                        Fashion
                      </Link>
                    </li>
                    <li className="list-inline-item m-1">
                      <Link
                        to="#"
                        className="rounded-3 fw-medium text-dark inline-block py-2 px-3"
                      >
                        Bride
                      </Link>
                    </li>
                    <li className="list-inline-item m-1">
                      <Link
                        to="#"
                        className="rounded-3 fw-medium text-dark inline-block py-2 px-3"
                      >
                        Lifestyle
                      </Link>
                    </li>
                    <li className="list-inline-item m-1">
                      <Link
                        to="#"
                        className="rounded-3 fw-medium text-dark inline-block py-2 px-3"
                      >
                        Travel
                      </Link>
                    </li>
                    <li className="list-inline-item m-1">
                      <Link
                        to="#"
                        className="rounded-3 fw-medium text-dark inline-block py-2 px-3"
                      >
                        Beauty
                      </Link>
                    </li>
                    <li className="list-inline-item m-1">
                      <Link
                        to="#"
                        className="rounded-3 fw-medium text-dark inline-block py-2 px-3"
                      >
                        Video
                      </Link>
                    </li>
                    <li className="list-inline-item m-1">
                      <Link
                        to="#"
                        className="rounded-3 fw-medium text-dark inline-block py-2 px-3"
                      >
                        Audio
                      </Link>
                    </li>
                  </ul>
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
