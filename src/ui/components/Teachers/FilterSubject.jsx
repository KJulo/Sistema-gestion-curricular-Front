import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Select } from "antd";
const { Option } = Select;

import { setActiveFilter } from "@slices/teachers";

const FilterSubject = ({ subjects }) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(setActiveFilter({ subjectId: value }))
  };

  return (
    <Select size="large" defaultValue={'Seleccionar asignatura'} onChange={handleChange}>
      {subjects.length > 0 ? subjects.map((s) => (
        <Option value={s.id}>{s.nombre}</Option>
      )): <></>}
    </Select>
  )
}

export default FilterSubject