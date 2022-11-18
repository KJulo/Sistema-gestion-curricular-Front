import React, { useEffect } from "react";

import {
  Avatar,
  Card,
  Divider,
  Typography,
  Button,
  Popconfirm,
  message,
  Spin,
} from "antd";

import {
  SubTitleContent,
  ContentTable,
  EditParent,
  AddParentStudent,
} from "@components/index";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";

import { columnsParent } from "@constants/admin/students";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_PARENT_ADMIN,
  DELETE_PARENT_ADMIN,
} from "@infrastructure/sagas/types/admin";
const { Text } = Typography;

const ViewParent = () => {
  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: FETCH_PARENT_ADMIN, payload: id });
  }, []);

  const { parent } = useSelector((store) => store.admin);

  const confirm = async (e) => {
    await dispatch({
      type: DELETE_PARENT_ADMIN,
      payload: { id: id },
    });
    navigate("/administrador/apoderados");
  };

  if (Object.keys(parent).length > 0 && parent.id === id) {
    return (
      <>
        <Card
          style={{ textAlign: "center" }}
          title={
            <div style={{ display:"flex", flexWrap:"wrap" }}>
              <Text strong>Información personal</Text>
            </div>
          }
          extra={
            <div style={{display:"flex", flexWrap:"wrap", gap:"16px"}}>
              <EditParent parent={parent} />
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
            <Text strong>Nombre(s): {parent.nombres}</Text>
            <Text strong>Apellido(s): {parent.apellidos}</Text>
            <Text strong>Correo: {parent.correo}</Text>
            <Text strong>Rut: {parent.rut}</Text>
            <Text strong>Telofono celular: {parent.telefono}</Text>
            {parent.telefonoEmergencia && (
              <Text strong>
                Telefono emergencia: {parent.telefonoEmergencia}
              </Text>
            )}
            <Text strong>Dirección: {parent.direccion}</Text>
          </div>
          <Divider />
          <SubTitleContent
            title="Pupilos"
            action={<AddParentStudent data={parent.id} students={parent.alumno} />}
          />
          <ContentTable content={parent.alumno} columns={columnsParent} type="student" />
        </Card>
      </>
    );
  } else {
    return <Spin />;
  }
};

export default ViewParent;
