import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Select } from "antd";
const { Option } = Select;

import { setActiveFilter } from "@slices/teachers";

import { LoadingSpinner } from "@components";

const Filter = ({ array, handleChange, size }) => {
  return array.length > 0 ? (
    <Select size="large" defaultValue={array[0].nombre} onChange={handleChange}>
      {array.map((s) => (
        <Option value={s.id}>{s.nombre}</Option>
      ))}
    </Select>
  ) : (
    <LoadingSpinner isLoading={true} size={size} style={{ marginTop: 10 }} />
  );
};

Filter.defaultProps = {
  size: "small",
};

export default Filter;
