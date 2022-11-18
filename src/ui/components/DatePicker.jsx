import React from "react";
import { DatePicker as DPAnt, Select } from "antd";
import moment from "moment";

const DatePicker = ({ onChange, defaultValue }) => {
  return (
    <DPAnt
      onChange={onChange}
      size="large"
      defaultValue={defaultValue ? moment(defaultValue) : moment()}
      format={"DD/MM/YYYY"}
    />
  );
};

export default DatePicker;
