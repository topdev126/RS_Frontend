import React from "react";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";

export const SearchSelect = ({
  labelName,
  Props,
  selectedPropType,
  changeProps,
  Icon,
  col,
}) => {
  const getSelectedLabel = () => {
    if (selectedPropType.length === 0) {
      return "Select ...";
    }
    return `Selected ${selectedPropType.length} ${
      selectedPropType.length > 1 ? "items" : "item"
    }.`;
  };
  return (
    <>
      <div className={`col-lg-${col} col-md-6 col-12`}>
        <div className="mb-3">
          <label className="form-label fs-6">{labelName} :</label>
          <div className="filter-search-form position-relative filter-border bg-light">
            {/* <pre>{JSON.stringify(ss)}</pre> */}
            <Icon className="fea icon-ex-md icons" />
            <MultiSelect
              className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
              options={Props}
              value={selectedPropType}
              onChange={changeProps}
              labelledBy="Select"
              valueRenderer={() => getSelectedLabel()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const SelectOne = ({ onChange, options, selectedOption, disabled }) => {
  return (
    <>
      <div className="bg-light">
        {/* <Icon className="fea icon-ex-md icons" /> */}
        <Select
          value={selectedOption}
          onChange={onChange}
          options={options}
          defaultValue={selectedOption}
          isDisabled={disabled}
        />
      </div>
    </>
  );
};
