//react
import React from "react";

//antd
import { Space, Typography } from "antd";
const { Title, Text } = Typography;
import { UsergroupAddOutlined } from "@ant-design/icons";

const DefaultTitleContent = ({ title, subtitle, action }) => {
  return (
    <div
      style={{
        justifyContent: "space-between",
        marginTop: "6px",
        alignItems: "center",
        display: "flex",
        marginBottom: "20px",
      }}>
      <Space direction="vertical">
        <Title style={{ marginBottom: 5 }}>{title}</Title>
        {subtitle ? <Text type="secondary">{subtitle}</Text> : <></>}
      </Space>
      <div>{action}</div>
    </div>
  );
};

export default DefaultTitleContent;
