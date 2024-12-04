import React from "react";

const TextSearch = ({
  labelName,
  placeholderName,
  searchKeywords,
  setSearchKeywords,
  Icon,
}) => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-12">
        <div className="mb-3">
          <label className="form-label fs-6">{labelName} :</label>
          <div className="filter-search-form position-relative filter-border">
            <Icon className="fea icon-ex-md icons" />
            <input
              name="name"
              type="text"
              className="form-control filter-input-box bg-light border-0"
              placeholder={placeholderName}
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TextSearch;
