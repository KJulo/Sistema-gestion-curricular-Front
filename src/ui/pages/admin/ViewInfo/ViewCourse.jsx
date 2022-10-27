import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DefaultTitleContent,
  ContentTable,
  SubTitleContent,
  AppendStudent,
  EditCourse,
} from "@components/index";

import { AdminTableLayout } from "@containers/index";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";

//constants
import {
  content as contentStudents,
  columnsCourse as columnsStudents,
} from "@constants/admin/students";
import {
  content as contentTeachers,
  columnsCourse as columnsTeachers,
} from "@constants/admin/teachers";

import {
  FETCH_COURSE_ADMIN,
  DELETE_COURSE_ADMIN,
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
  const [idProfesor, setIdProfesor] = useState();

  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_COURSE_ADMIN, payload: id });
  }, []);

  const confirm = (e) => {
    dispatch({
      type: DELETE_COURSE_ADMIN,
      payload: { id: id, navigate },
    });
    message.success("Curso eliminado con exito.");
  };

  const agregarProfesor = () => {
    console.log(idProfesor);
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
          <Col span={12} style={{display: "flex"}}>
            {course.profesor ? (
              <Card title="Profesor jefe" style={{flex:1}}>
                <Avatar size={128} icon={<UserOutlined />} />
                <Text strong>Nombre(s): {course.profesor.nombres}</Text>
                <Text strong>Apellido(s): {course.profesor.apellidos}</Text>
                <Text strong>Correo: {course.profesor.correo}</Text>
                <Text strong>Rut: {course.profesor.rut}</Text>{" "}
              </Card>
            ) : (
              <Card title="Profesor jefe" style={{flex:1}} >
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
                                setIdProfesor({ id_profesor: e.target.value });
                              }}
                              style={{ marginBottom:"20px"}}
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
          <Col span={12} style={{display:"flex"}}>
            <Card title="Asignaturas" style={{flex:1}}>
              <List
                itemLayout="horizontal"
                size="default"
                dataSource={[
                  { title: "Matemáticas" },
                  { title: "Lenguaje" },
                  { title: "Ciencias" },
                  { title: "Historia" },
                  { title: "Educación Física" },
                  { title: "Arte" },
                  { title: "Tecnología" },
                ]}
                renderItem={(item) => (
                  <Row>
                    <Text>{item.title}</Text>
                    <Divider />
                  </Row>

                )}
              ></List>
            </Card>
          </Col>
        </Row>
        <Divider />

        <div>
          <SubTitleContent title="Estudiante(s)" action={<AppendStudent />} />
          
          <AdminTableLayout
            tableContent={
              <ContentTable
                content={course.alumno}
                columns={columnsStudents}
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
