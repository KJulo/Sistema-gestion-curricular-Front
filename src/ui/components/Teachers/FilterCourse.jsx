import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { DatePicker, Select } from "antd";
const { Option } = Select;

// slices
import { setActiveFilter } from "@slices/teachers";

import { useGetCurrentDate } from "@hooks/useDate";

import { LoadingSpinner, EmptySelect } from "@components";

const FilterCourse = ({ courses }) => {
  const dispatch = useDispatch();
  const defaultValue = courses.length > 0 ? courses[0].id : "Sin Cursos";

  const handleChange = (value) => {
    const selectedCourse = courses.find((c) => c.id === value);
    dispatch(setActiveFilter({ courseId: value }));
    if (selectedCourse.asignaturas.length > 0) {
      dispatch(setActiveFilter({ subjectId: selectedCourse.asignaturas[0].id }));
    }
  };

  useEffect(() => {
    const dateSplited = useGetCurrentDate().split("-");
    const date = dateSplited[2] + "-" + dateSplited[1] + "-" + dateSplited[0];
    dispatch(setActiveFilter({ selectedDate: date }));
    if (courses.length > 0) {
      dispatch(setActiveFilter({ courseId: courses[0].id }));
      if (courses[0].asignaturas.length > 0) {
        dispatch(setActiveFilter({ subjectId: courses[0].asignaturas[0].id }));
      }
    }
  }, [courses]);

  return (
    <div style={{ display: "flex", flexDirection: "row-revers", flexWrap: "wrap", gap: "12px" }}>
      {courses.length > 0 ? (
        <Select size="large" defaultValue={courses[0].id} onChange={handleChange}>
          {courses.map((course) => (
            <Option value={course.id}>
              {course.nombre} - {course.paralelo}
            </Option>
          ))}
        </Select>
      ) : (
        <EmptySelect text={"Sin cursos"} />
      )}
    </div>
  );
};

export default FilterCourse;
