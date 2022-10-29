import React from "react";

import { Avatar, Card, Divider, Typography, Button } from "antd";
import { SubTitleContent, ContentTable, AddStudent, DefaultTitleContent } from "@components/index";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { content, columns } from "@constants/admin/students";

const { Text } = Typography;

const ViewStudent = () => {
  return (
    <>
      <DefaultTitleContent title="Alumno:" />
      <Card
        style={{ textAlign: "center" }}
        title={<div style={{ marginLeft: "210px" }}>Pedro Gutierrez</div>}
        extra={
          <div>
            <Button style={{ marginRight: "20px" }}>
              <EditOutlined /> Editar
            </Button>
            <Button>
              <DeleteOutlined />
              Eliminar
            </Button>
          </div>
        }>
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
          }}>
          <Avatar size={128} src="https://joeschmoe.io/api/v1/random" />
          <Text strong>Nombre: Pedro Gutierrez</Text>
          <Text strong>Correo: example@example.com </Text>
          <Text strong>Telefono: +569 12345678</Text>
          <Text strong>Dirección: Av.SiempreVida 3844</Text>
        </div>
        <Divider />
        <SubTitleContent title="Apoderado(s)" action={AddStudent} />
        <ContentTable content={content} columns={columns} scroll={false} />
      </Card>
    </>
  );
};

export default ViewStudent;
