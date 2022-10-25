import React, { useEffect } from "react";

import {
  Avatar,
  Card,
  Divider,
  Typography,
  Button,
  Popconfirm,
  message,
} from "antd";

import {
  SubTitleContent,
  ContentTable,
  AddPupilo,
  EditParent,
} from "@components/index";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";

import { content, columns } from "@constants/admin/students";
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

  const confirm = (e) => {
    dispatch({
      type: DELETE_PARENT_ADMIN,
      payload: { id: id, navigate },
    });
    message.success("Apoderado eliminado con exito.");
  };

  if (parent) {
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
          <SubTitleContent title="Pupilos" action={<AddPupilo />} />
          <ContentTable content={content} columns={columns} type="student" />
        </Card>
      </>
    );
  } else {
    return <></>;
  }
};

export default ViewParent;
