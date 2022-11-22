import React from "react";

import { DownOutlined } from "@ant-design/icons";

import "@styles/Custom.less";

const EmptySelect = ({ text }) => {
  return (
    <div className="select-custom">
      <div style={{ marginLeft: "-7px", color: "#958888" }}>{text}</div>
      <div className="ant-arrow">
        <DownOutlined />
      </div>
    </div>
  );
};

export default EmptySelect;
