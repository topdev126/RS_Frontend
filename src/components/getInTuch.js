import React from "react";
import { Link } from "react-router-dom";
import { FiMail } from "../assect/icons/vander";

export default function GetInTuch() {
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="section-title text-center">
          <h4 className="title mb-3">Have Question ? Get in touch!</h4>
          <p className="text-muted para-desc mb-0 mx-auto">
            A great plateform to buy, sell and rent your properties without any
            agent or commisions.
          </p>
          <div className="mt-4 pt-2">
            <Link to="/contactus" className="btn btn-pills btn-primary">
              <span className="h5 mb-0 me-1">
                <FiMail className="fea icon-sm" />
              </span>{" "}
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
