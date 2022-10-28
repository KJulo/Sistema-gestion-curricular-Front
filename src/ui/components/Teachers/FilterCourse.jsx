import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { DatePicker, Select } from "antd";
const { Option } = Select;

import { setActiveFilter } from "@slices/teachers";

import { useGetCurrentDate } from "@hooks/useDate";

const FilterCourse = () => {
  const dispatch = useDispatch();
  const courses = useSelector((store) => store.teacher.courses.list);

  const handleChange = (value) => {
    dispatch(setActiveFilter({ courseId: value }));
  };

  const onChange = (date, dateString) => {
    dispatch(setActiveFilter({ selectedDate: dateString }));
  };

  useEffect(() => {
    dispatch(setActiveFilter({ selectedDate: useGetCurrentDate() }));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row-revers", flexWrap: "wrap", gap: "12px" }}>
      <DatePicker
        onChange={(date, dateString) => onChange(date, dateString)}
        size="large"
        defaultValue={moment()}
        format={"DD/MM/YYYY"}
      />
      <Select size="large" defaultValue={"Cambiar curso"} onChange={handleChange}>
        {courses.map((course) => (
          <Option value={course.id}>
            {course.nombre} - {course.paralelo}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default FilterCourse;
