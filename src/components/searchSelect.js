import React from "react";
import Select from "react-select";

const SearchSelect = ({ labelName, Props, selectedPropType, changeProps, Icon }) => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-12">
        <div className="mb-3">
          <label className="form-label fs-6">{labelName} :</label>
          <div className="filter-search-form position-relative filter-border bg-light">
            <Icon className="fea icon-ex-md icons" />
            <Select
              className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
              options={Props}
              value={selectedPropType || null}
              onChange={changeProps}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSelect;
