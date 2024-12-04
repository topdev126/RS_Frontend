import React from "react";

const SearchSubProps = ({
  labelName,
  subProperties,
  selectedSubProperties,
  handleSubProps,
}) => {
  return (
    <>
      <div className="col-12 mt-4">
        <div className="mb-4 mx-5">
          <label
            className="form-label fs-6 text-center d-block"
          >
            {labelName}:
          </label>
          <div
            className="card p-3 border shadow-sm bg-light"
            style={{ maxHeight: "200px", overflow: "auto" }}
          >
            <div className="d-flex flex-wrap gap-3 px-2">
              {subProperties.map((item) => (
                <div
                  className="form-check d-flex align-items-center me-3 p-2 rounded border"
                  key={item}
                  style={{
                    minWidth: "150px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id={`checkbox-${item}`}
                    value={item}
                    checked={selectedSubProperties.includes(item)}
                    onChange={() => handleSubProps(item)}
                    style={{
                      border: "1px solid #007bff",
                      accentColor: "#007bff",
                    }}
                  />
                  <label
                    className="form-check-label text-dark"
                    htmlFor={`checkbox-${item}`}
                    style={{ fontSize: "0.9rem" }}
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSubProps;
