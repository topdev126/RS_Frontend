import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg3 from "../../assect/images/bg/03.jpg";
import logo from "../../assect/images/logo-icon-white.png";

export default function Comingsoon() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("light");

    const interval = setInterval(() => {
      let startDate = new Date("June 25, 2024 16:37:52");
      let currentDate = new Date();
      const diff = startDate.getTime() - currentDate.getTime();

      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      setTime({ hours, minutes, seconds, days });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="bg-home zoom-image d-flex align-items-center">
      <div
        className="bg-overlay image-wrap"
        style={{ backgroundImage: `url(${bg3})`, backgroundPosition: "center" }}
      ></div>
      <div className="bg-overlay bg-gradient-overlay"></div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className="d-flex flex-column min-vh-100 justify-content-center px-md-5 py-5 px-4">
              <div className="text-center">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="title-heading text-center my-auto">
                <h1 className="title-dark text-white mt-2 mb-4 coming-soon">
                  We are coming soon...
                </h1>
                <p className="text-white-50 para-desc para-dark mx-auto">
                  A great plateform to buy, sell and rent your properties
                  without any agent or commisions.
                </p>

                <div id="countdown">
                  <ul className="count-down list-unstyled">
                    <li id="days" className="count-number list-inline-item m-2">
                      {time.days}
                      <p className="count-head">Days</p>
                    </li>
                    <li
                      id="hours"
                      className="count-number list-inline-item m-2 m-2"
                    >
                      {" "}
                      {time.hours}
                      <p className="count-head">Hours</p>
                    </li>
                    <li
                      id="mins"
                      className="count-number list-inline-item m-2 m-2"
                    >
                      {time.minutes}
                      <p className="count-head">Mins</p>
                    </li>
                    <li
                      id="secs"
                      className="count-number list-inline-item m-2 m-2"
                    >
                      {time.seconds}
                      <p className="count-head">Secs</p>
                    </li>
                    <li id="end" className="h1"></li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <p className="mb-0 text-muted">
                  © {new Date().getFullYear()} Pro-2. Design & Develop with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by{" "}
                  <Link
                    to="https://shreethemes.in/"
                    target="_blank"
                    className="text-reset"
                  >
                    SasaSimic
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
