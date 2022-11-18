import React, { useEffect } from "react";

import {
  Avatar,
  Card,
  Button,
  Typography,
  Popconfirm,
  message,
  Row,
  Col,
  List,
  Divider,
  Spin,
} from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
const { Text, Title } = Typography;

import "@styles/AdminViewInfo.less";

import { EditTeacher } from "@components/index";

import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_TEACHER_ADMIN,
  DELETE_TEACHER_ADMIN,
} from "@infrastructure/sagas/types/admin";

const ViewTeacher = () => {
  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: FETCH_TEACHER_ADMIN, payload: id });
  }, []);

  const { teacher } = useSelector((store) => store.admin);
  const confirm = async (e) => {
    await dispatch({
      type: DELETE_TEACHER_ADMIN,
      payload: { id: id },
    });
    navigate("/administrador/profesores");
  };
  if (Object.keys(teacher).length > 0 && teacher.id === id) {
    return (
      <Row style={{ display: "flex", flexFlow: "column" }}>
        <Col>
          <Card
            style={{ textAlign: "center" }}
            title={
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Text strong>Información personal</Text>
              </div>
            }
            extra={
              <div style={{ display: "flex", flexWrap: "wrap", gap:"16px" }}>
                <EditTeacher teacher={teacher} />
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
              <Text strong>Nombre(s): {teacher.nombres}</Text>
              <Text strong>Apellido(s): {teacher.apellidos}</Text>
              <Text strong>Correo: {teacher.correo}</Text>
              <Text strong>Rut: {teacher.rut}</Text>
            </div>
            {/* {teacher.asignatura && teacher.asignatura.length > 0 ? (
              <Card style={{ marginTop: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                  }}
                >
                  <Title level={5} underline={true}>
                    Asignatura(s)
                  </Title>
                  <List
                    itemLayout="horizontal"
                    size="default"
                    dataSource={teacher.asignatura}
                    renderItem={(asignatura) => (
                      <Row style={{ justifyContent: "space-between" }}>
                        <Col
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <Text>{asignatura.nombre}</Text>
                        </Col>
                        <Divider />
                      </Row>
                    )}
                  ></List>
                </div>
              </Card>
            ) : null} */}
          </Card>
        </Col>
        <Col></Col>
      </Row>
    );
  } else {
    return <Spin />;
  }
};

export default ViewTeacher;
