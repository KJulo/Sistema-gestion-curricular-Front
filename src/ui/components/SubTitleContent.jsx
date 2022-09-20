//react
import React from "react";

//antd
import { Button, Typography } from "antd";
const { Title } = Typography;
import { UsergroupAddOutlined } from "@ant-design/icons";

const SubTitleContent = ({ title, action }) => {
  return (
    <div
      style={{
        justifyContent: "space-between",
        marginTop: "6px",
        alignItems: "center",
        display: "flex",
        
      }}
    >
      <Title level={5}>{title}</Title>
      <div>{action}</div>
    </div>
  );
};

export default SubTitleContent;
