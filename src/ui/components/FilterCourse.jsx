import React from "react";
import { DatePicker, Select } from "antd";
const { Option } = Select;

const FilterCourse = () => {
  return (
    <div style={{display:"flex", justifyContent:"space-between", gap:"12px"}}>
      <Select defaultValue="1">
        <Option value="1">Matematicas - Primero Basico</Option>
        <Option value="2">Matematicas - Segundo Basico</Option>
        <Option value="3">Matematicas - Tercero Basico</Option>
        <Option value="4">Matematicas - Cuarto Basico</Option>
        <Option value="5">Matematicas - Quinto Basico</Option>
        <Option value="6">Matematicas - Sexto Basico</Option>
        <Option value="7">Matematicas - Septimo Basico</Option>
        <Option value="8">Matematicas - Octavo Basico</Option>
      </Select>
      <DatePicker
        onChange={(date, dateString) => console.log(date, dateString)}
        picker="year"
        
      />
    </div>
  );
};

export default FilterCourse;
