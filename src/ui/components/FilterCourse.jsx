import React from "react";
import moment from "moment";
import { DatePicker, Select } from "antd";
const { Option } = Select;


const FilterCourse = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse",flexWrap:"wrap", gap: "12px" }}>
      <DatePicker
        onChange={(date, dateString) => console.log(date, dateString)}
        picker="year"
        size="large"
        defaultValue={moment("2022", "YYYY")}
      />
      <Select size="large" defaultValue="1">
        <Option value="1">Primero Básico</Option>
        <Option value="2">Segundo Básico</Option>
        <Option value="3">Tercero Básico</Option>
        <Option value="4">Cuarto Básico</Option>
        <Option value="5">Quinto Básico</Option>
        <Option value="6">Sexto Básico</Option>
        <Option value="7">Septimo Básico</Option>
        <Option value="8">Octavo Básico</Option>
      </Select>
      <Select size="large" defaultValue="1">
        <Option value="1">Matematicas</Option>
        <Option value="2">Fisica</Option>
        <Option value="3">Quimica</Option>
        <Option value="4">Biologia</Option>
      </Select>
    </div>
  );
};

export default FilterCourse;
