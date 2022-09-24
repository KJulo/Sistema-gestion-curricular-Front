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
  const courses = useSelector((store) => store.admin.courses);
  const courseFilters = courses.filters.courses;
  const subjectFilters = courses.filters.subjects;

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse",flexWrap:"wrap", gap: "12px" }}>
      <DatePicker
        onChange={(date, dateString) => console.log(date, dateString)}
        picker="year"
        size="large"
        defaultValue={moment("2022", "YYYY")}
      />
      <Options options={courseFilters} />
      <Options options={subjectFilters} />
    </div>
  );
};

export default FilterCourse;
