import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DefaultTitleContent,
  ContentTable,
  SubTitleContent,
  AppendStudent,
  EditCourse,
  AddSubject,
  EditSubject,
  Warning,
} from "@components/index";

import { AdminTableLayout } from "@containers/index";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";

//constants
import {
  columnsCourse
} from "@constants/admin/students";


import {
  FETCH_COURSE_ADMIN,
  DELETE_COURSE_ADMIN,
  APPEND_COURSE_TEACHER_ADMIN,
  DELETE_SUBJECT_ADMIN,
} from "@infrastructure/sagas/types/admin";

import {
  Divider,
  Button,
  Popconfirm,
  message,
  Card,
  Avatar,
  Typography,
  Input,
  Row,
  Col,
  Result,
  List,
} from "antd";

const { Text } = Typography;

const ViewCourse = () => {
  const [id_profesor, setIdProfesor] = useState();

  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_COURSE_ADMIN, payload: id });
  }, []);

  const confirm = async (e) => {
    await dispatch({
      type: DELETE_COURSE_ADMIN,
      payload: { id: id, },
    });
    navigate("/administrador/cursos");
  };

  const agregarProfesor = () => {
    dispatch({
      type: APPEND_COURSE_TEACHER_ADMIN,
      payload: { id_profesor, id: course.id },
    });
  };

  const { course } = useSelector((store) => store.admin);
  if (course) {
    return (
      <>
        <DefaultTitleContent
          title={
            course.nombre !== undefined
              ? `${course.nombre} - ${course.paralelo}, año:${course.anho}`
              : ""
          }
          action={
            <div>
              <EditCourse course={course} />
              <Popconfirm
                title="¿Estás seguro de que quieres eliminar este curso?"
                onConfirm={confirm}
                okText="Si"
                cancelText="No"
              >
                <Button type="danger">
                  <DeleteOutlined /> Eliminar
                </Button>
              </Popconfirm>
            </div>
          }
        />
        <Divider />
        <Row gutter={16} type="flex">
          <Col span={12} style={{ display: "flex" }}>
            {course.profesor ? (
              <Card
                title="Profesor jefe"
                style={{ flex: 1, flexFlow: "column" }}
                extra={
                  <Popconfirm
                    title="¿Estás seguro de que quieres eliminar el profesor de este curso?"
                    onConfirm={() => {
                      dispatch({
                        type: APPEND_COURSE_TEACHER_ADMIN,
                        payload: { id_profesor: null, id: course.id },
                      });
                    }}
                    okText="Si"
                    cancelText="No"
                  >
                    <Button type="danger">Eliminar</Button>
                  </Popconfirm>
                }
              >
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <Avatar size={128} icon={<UserOutlined />} />
                  <Text strong>Nombre(s): {course.profesor.nombres}</Text>
                  <Text strong>Apellido(s): {course.profesor.apellidos}</Text>
                  <Text strong>Correo: {course.profesor.correo}</Text>
                  <Text strong>Rut: {course.profesor.rut}</Text>{" "}
                </div>
              </Card>
            ) : (
              <Card title="Profesor jefe" style={{ flex: 1 }}>
                <Row style={{ justifyContent: "center" }}>
                  <Col>
                    <Result
                      status="warning"
                      title="No existe un profesor asociado a este curso. Por favor ingrese uno en la siguiente casilla."
                      extra={
                        <>
                          <Input.Group>
                            <Input
                              placeholder="ID del profesor"
                              onChange={(e) => {
                                setIdProfesor(e.target.value);
                              }}
                              style={{ marginBottom: "20px" }}
                            ></Input>
                            <Button type="primary" onClick={agregarProfesor}>
                              Agregar
                            </Button>
                          </Input.Group>
                        </>
                      }
                    />
                  </Col>
                </Row>
              </Card>
            )}
          </Col>
          <Col span={12} style={{ display: "flex" }}>
            <Card
              title="Asignaturas"
              style={{ flex: 1 }}
              extra={<AddSubject courseId={course.id} />}
            >
              <List
                itemLayout="horizontal"
                size="default"
                dataSource={course.asignatura}
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
                      {asignatura.id_profesor ? (
                        <></>
                      ) : (
                        <Warning text="No existe profesor asignado a esta asignatura" />
                      )}
                    </Col>
                    <Col style={{ display: "flex", gap: "10px" }}>
                      <Popconfirm
                        title="¿Estás seguro de que quieres eliminar esta asignatura?"
                        onConfirm={() => {
                          dispatch({
                            type: DELETE_SUBJECT_ADMIN,
                            payload: asignatura.id,
                          });
                        }}
                        okText="Si"
                        cancelText="No"
                      >
                        <DeleteOutlined style={{ color: "red" }} />
                      </Popconfirm>
                      <EditSubject asignatura={asignatura} />
                    </Col>
                    <Divider />
                  </Row>
                )}
              ></List>
            </Card>
          </Col>
        </Row>
        <Divider />

        <div>
          <SubTitleContent
            title="Estudiante(s)"
            action={<AppendStudent type="course" data={course.id} />}
          />
          <AdminTableLayout
            tableContent={
              <ContentTable
                content={course.alumno}
                columns={columnsCourse}
                type="student"
              />
            }
          />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ViewCourse;
