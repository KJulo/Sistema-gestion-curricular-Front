import React from "react";

import { Avatar, Card, Button, Typography } from "antd";
import { EditOutlined,DeleteOutlined } from "@ant-design/icons";
const { Text } = Typography;

import "@styles/AdminViewInfo.less";

const ViewTeacher = () => {
  return (
    <Card
      style={{ textAlign: "center" }}
      title={<div style={{ marginLeft: "210px" }}>Pedro Gutierrez</div>}
      extra={
          <div>
            <Button style={{marginRight:"20px"}}>
              <EditOutlined /> Editar
            </Button>
            <Button>
              <DeleteOutlined />
              Eliminar
            </Button>
          </div>
      }
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Avatar size={128} src="https://joeschmoe.io/api/v1/random" />
        <Text strong>Nombre: Pedro Gutierrez</Text>
        <Text strong>Correo: example@example.com </Text>
        <Text strong>Telefono: +569 12345678</Text>
        <Text strong>Dirección: Av.SiempreVida 3844</Text>
      </div>
    </Card>
  );
};

export default ViewTeacher;
