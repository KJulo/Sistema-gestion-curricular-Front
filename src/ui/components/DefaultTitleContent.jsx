//react
import React from "react";

//antd
import { Button, Typography } from "antd";
const { Title } = Typography;
import { UsergroupAddOutlined } from "@ant-design/icons";

const DefaultTitleContent = ({ title, action }) => {
  return (
    <div
      style={{
        justifyContent: "space-between",
        marginTop: "6px",
        alignItems: "center",
        display: "flex",
        marginBottom: "20px",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <Title>{title}</Title>
      <div>{action}</div>
    </div>
  );
};

export default DefaultTitleContent;
