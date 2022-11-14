import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Select } from "antd";
const { Option } = Select;

import { setActiveFilter } from "@slices/teachers";

import { LoadingSpinner } from "@components";

const FilterSubject = ({ subjects }) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(setActiveFilter({ subjectId: value }));
  };

  return subjects.length > 0 ? (
    <Select size="large" defaultValue={subjects[0].nombre} onChange={handleChange}>
      {subjects.map((s) => (
        <Option value={s.id}>{s.nombre}</Option>
      ))}
    </Select>
  ) : (
    <LoadingSpinner isLoading={true} size={"small"} style={{ marginTop: 10 }} />
  );
};

export default FilterSubject;
