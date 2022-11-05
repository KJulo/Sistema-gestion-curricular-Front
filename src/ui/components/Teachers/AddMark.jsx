import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

const AddMark = () => {
  return (
    <Button type="primary" size="large" icon={<PlusOutlined />}>
      Añadir Nota
    </Button>
  );
};

export default AddMark;
