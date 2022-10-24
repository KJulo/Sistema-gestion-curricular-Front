import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { DatePicker, Select } from "antd";
const { Option } = Select;

import { setActiveFilter } from "@slices/teachers";

const FilterCourse = () => {
  const dispatch = useDispatch();
  const courses = useSelector((store) => store.teacher.courses.basicInfo);
  
  const handleChange = (value) => {
    dispatch(setActiveFilter({ filter: value }))
  };

  return (
    <div style={{ display: "flex", flexDirection: "row-revers", flexWrap:"wrap", gap: "12px" }}>
      <DatePicker
        onChange={(date, dateString) => console.log(date, dateString)}
        picker="year"
        size="large"
        defaultValue={moment("2022", "YYYY")}
      />
      <Select size="large" defaultValue={'Cambiar curso'} onChange={handleChange}>
        {courses.map((course) => (
          <Option value={course.id}>{course.nombre} - {course.paralelo}</Option>
        ))}
      </Select>
    </div>
  );
};

export default FilterCourse;
