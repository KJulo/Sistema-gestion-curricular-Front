import React, { useEffect, useState } from "react";

import {
  Avatar,
  Card,
  Divider,
  Typography,
  Button,
  Popconfirm,
  message,
} from "antd";
const { Text } = Typography;
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  SubTitleContent,
  DeleteStudentParent,
  EditStudent,
  AddStudentParent,
} from "@components/index";

import { content, columns } from "@constants/admin/students";

import {
  FETCH_STUDENT_ADMIN,
  DELETE_STUDENT_ADMIN,
} from "@infrastructure/sagas/types/admin";

const ViewStudent = () => {
  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_STUDENT_ADMIN, payload: id });
  }, []);

  const confirm = async (e) => {
    await dispatch({
      type: DELETE_STUDENT_ADMIN,
      payload: { id: id },
    });
    navigate("administrador/alumnos");
  };
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
              <EditStudent student={student} />
              <Popconfirm
                title="¿Estás seguro de que quieres eliminar a este usuario?"
                onConfirm={confirm}
                okText="Si"
                cancelText="No"
              >
                <Button type="danger">
                  <DeleteOutlined />
                  Eliminar
                </Button>
              </Popconfirm>
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
            <Text strong>Nombre(s): {student.nombres}</Text>
            <Text strong>Apellido(s): {student.apellidos}</Text>
            <Text strong>Correo: {student.correo}</Text>
            <Text strong>Rut: {student.rut}</Text>
          </div>
          <Divider />
          <SubTitleContent
            title="Apoderado"
            action={
              student.apoderado ? (
                <DeleteStudentParent data={student.id} />
              ) : (
                <AddStudentParent data={student.id} />
              )
            }
          />
          {student.apoderado ? (
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Avatar size={128} icon={<UserOutlined />} />
              <Text strong>Nombre(s): {student.nombres}</Text>
              <Text strong>Apellido(s): {student.apellidos}</Text>
              <Text strong>Correo: {student.correo}</Text>
              <Text strong>Rut: {student.rut}</Text>
              <Text strong>Telofono celular: {student.telefono}</Text>
              {student.telefonoEmergencia && (
                <Text strong>
                  Telefono emergencia: {student.telefonoEmergencia}
                </Text>
              )}
              <Text strong>Dirección: {student.direccion}</Text>
            </div>
          ) : (
            <></>
          )}
        </Card>
      </>
    );
  } else {
    return <div>Cargando...</div>;
  }
};

export default ViewStudent;
