import React from "react";
import { DatePicker as DPAnt, Select } from "antd";
import moment from "moment";

const DatePicker = ({ onChange }) => {
  return <DPAnt onChange={onChange} size="large" defaultValue={moment()} format={"DD/MM/YYYY"} />;
};

export default DatePicker;
