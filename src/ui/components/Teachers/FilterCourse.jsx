import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { DatePicker, Select } from "antd";
const { Option } = Select;

import { setActiveFilter } from "@slices/teachers";

import { useGetCurrentDate } from "@hooks/useDate";

const FilterCourse = ({ courses, includeDate }) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(setActiveFilter({ courseId: value }));
  };

  const onChange = (_, dateString) => {
    const dateSplited = dateString.split("/");
    const date = dateSplited[2] + "-" + dateSplited[1] + "-" + dateSplited[0];
    dispatch(setActiveFilter({ selectedDate: date }));
  };

  useEffect(() => {
    const dateSplited = useGetCurrentDate().split("-");
    const date = dateSplited[2] + "-" + dateSplited[1] + "-" + dateSplited[0];
    dispatch(setActiveFilter({ selectedDate: date }));
    if (courses.length > 0) dispatch(setActiveFilter({ courseId: courses[0].id }));
  }, [courses]);

  return (
    <div style={{ display: "flex", flexDirection: "row-revers", flexWrap: "wrap", gap: "12px" }}>
      {includeDate ? (
        <DatePicker
          onChange={onChange}
          size="large"
          defaultValue={moment()}
          format={"DD/MM/YYYY"}
        />
      ) : (
        <></>
      )}

      {courses.length > 0 ? (
        <Select size="large" defaultValue={courses[0].id} onChange={handleChange}>
          {courses.map((course) => (
            <Option value={course.id}>
              {course.nombre} - {course.paralelo}
            </Option>
          ))}
        </Select>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FilterCourse;
