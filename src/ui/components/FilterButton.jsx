import { Select } from 'antd';
import React from 'react'

const FilterButton = ({options, onChange}) => {
  console.log(options);
  return (
    <Select size="large" defaultValue={options[0]} onChange={onChange}>
      {options.map((filter, index) => (
        <Option value={index}>{filter}</Option>
      ))}
    </Select>
  )
}


export default FilterButton;