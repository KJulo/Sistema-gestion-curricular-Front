//react
import React from "react";

//antd
import { Button, Typography } from "antd";
const { Title } = Typography;
import { UsergroupAddOutlined } from "@ant-design/icons";

const DefaultTitleContent = ({ title, action }) => {
  return (
    <div
      className="display-flex"
      style={{
        justifyContent: "space-between",
        marginTop: "6px",
      }}
    >
      <Title>{title}</Title>
      <div>{action}</div>
    </div>
  );
};

export default DefaultTitleContent;
