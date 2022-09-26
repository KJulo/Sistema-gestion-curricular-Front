import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { DatePicker, Select } from "antd";
const { Option } = Select;


const Options = ({ options }) => {
  return (
    <Select size="large" defaultValue={options[0]}>
      {options.map((filter, index) => (
        <Option value={index}>{filter}</Option>
      ))}
    </Select>
  )
}

const FilterCourse = () => {
  const courseFilters = useSelector((store) => store.teacher.courses.courseFilters);
  return (
    <div style={{ display: "flex", flexDirection: "row-revers", flexWrap:"wrap", gap: "12px" }}>
      <DatePicker
        onChange={(date, dateString) => console.log(date, dateString)}
        picker="year"
        size="large"
        defaultValue={moment("2022", "YYYY")}
      />
      <Options options={courseFilters} />
    </div>
  );
};

export default FilterCourse;
