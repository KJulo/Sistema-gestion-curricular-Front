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
  DefaultTitleContent,
} from "@components/index";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";

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
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
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
              <Button style={{ marginRight: "20px" }}>
                <EditOutlined /> Editar
              </Button>
              <Popconfirm
                title="¿Estás seguro de que quieres eliminar a este usuario?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Si"
                cancelText="No"
              >
                <Button>
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
