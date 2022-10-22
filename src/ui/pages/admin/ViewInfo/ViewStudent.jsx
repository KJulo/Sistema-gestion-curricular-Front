import React, { useEffect } from "react";

import { Avatar, Card, Divider, Typography, Button } from "antd";
const { Text } = Typography;
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  SubTitleContent,
  ContentTable,
  AddStudent,
  DefaultTitleContent,
} from "@components/index";

import { content, columns } from "@constants/admin/students";

import { FETCH_STUDENT_ADMIN } from "@infrastructure/sagas/types/admin";

const ViewStudent = () => {
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_STUDENT_ADMIN, payload: id });
  }, []);

  const { student } = useSelector((store) => store.admin);
  if (student) {
    return (
      <>
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
            <Avatar size={128} src="https://joeschmoe.io/api/v1/random" />
            <Text strong>Nombre(s): {student.nombres}</Text>
            <Text strong>Apellido(s): {student.apellidos}</Text>
            <Text strong>Correo: {student.correo}</Text>
            <Text strong>Rut: {student.rut}</Text>
          </div>
          <Divider />
          <SubTitleContent title="Apoderado(s)" action={AddStudent} />
          <ContentTable content={content} columns={columns} type="student" />
        </Card>
      </>
    );
  } else {
    return <div>Cargando...</div>;
  }
};

export default ViewStudent;
