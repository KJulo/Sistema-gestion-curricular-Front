import React, { useEffect } from "react";

import { Avatar, Card, Button, Typography } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
const { Text } = Typography;

import "@styles/AdminViewInfo.less";

import { useDispatch, useSelector } from "react-redux";
import { FETCH_TEACHER_ADMIN } from "@infrastructure/sagas/types/admin";

const ViewTeacher = () => {
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: FETCH_TEACHER_ADMIN, payload: id });
  }, []);

  const { teacher } = useSelector((store) => store.admin);

  if (teacher) {
    return (
      <Card
        style={{ textAlign: "center" }}
        title={
          <div style={{ marginLeft: "210px" }}>
            <Text strong>Información personal</Text>
          </div>
        }
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
          <Avatar size={128} icon={<UserOutlined />} />
          <Text strong>Nombre(s): {teacher.nombres}</Text>
          <Text strong>Apellido(s): {teacher.apellidos}</Text>
          <Text strong>Correo: {teacher.correo}</Text>
          <Text strong>Rut: {teacher.rut}</Text>
        </div>
      </Card>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default ViewTeacher;
