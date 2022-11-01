import { Select } from "antd";
import React from "react";

const FilterButton = ({ options, onChange }) => {
  return options[0] ? (
    <Select size="large" defaultValue={options[0]} onChange={onChange}>
      {options.map((filter, index) => (
        <Option value={index}>{filter}</Option>
      ))}
    </Select>
  ) : (
    <></>
  );
};

export default FilterButton;
