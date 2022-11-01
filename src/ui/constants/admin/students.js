import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Col, Row, Tooltip, Typography } from "antd";
import { DeleteStudentCourse, DeleteParentStudent } from "@components/index";
const { Paragraph } = Typography;

export const columns = [
  {
    title: "Nombres",
    dataIndex: "nombres",
    key: "name",
  },
  {
    title: "Apellidos",
    dataIndex: "apellidos",
    key: "apellidos",
  },
  {
    title: "Rut",
    dataIndex: "rut",
    key: "rut",
    render: (text) => (
      <div style={{ textOverflow: "clip !important", whiteSpace: "nowrap" }}>
        {text}
      </div>
    ),
  },
  {
    title: "Correo",
    dataIndex: "correo",
    key: "correo",
  },
  {
    title: "Acciones",
    dataIndex: "id",
    key: "id",
    render: (record) => (
      <Row>
        <Col>
          <Tooltip title="Ver información del alumno">
            <Link
              to={`/administrador/alumnos/${record}`}
              state={{ id: record }}
            >
              <EyeOutlined style={{ marginRight: "8px" }} />
            </Link>
          </Tooltip>
        </Col>
        <Col>
          <Paragraph
            copyable={{
              text: record,
              tooltips: ["Copiar ID del alumno", "ID copiado"],
            }}
          ></Paragraph>
        </Col>
      </Row>
    ),
  },
];

export const columnsCourse = [
  {
    title: "Nombres",
    dataIndex: "nombres",
    key: "name",
  },
  {
    title: "Apellidos",
    dataIndex: "apellidos",
    key: "apellidos",
  },
  {
    title: "Rut",
    dataIndex: "rut",
    key: "rut",
    render: (text) => (
      <div style={{ textOverflow: "clip !important", whiteSpace: "nowrap" }}>
        {text}
      </div>
    ),
  },
  {
    title: "Correo",
    dataIndex: "correo",
    key: "correo",
  },
  {
    title: "Acciones",
    dataIndex: "id",
    key: "id",
    render: (record) => (
      <Row>
        <Col>
          <Tooltip title="Ver información del alumno">
            <Link
              to={`/administrador/alumnos/${record}`}
              state={{ id: record }}
            >
              <EyeOutlined style={{ marginRight: "8px" }} />
            </Link>
          </Tooltip>
        </Col>
        <Col>
          <DeleteStudentCourse id={record} />
        </Col>
      </Row>
    ),
  },
];

export const columnsParent = [
  {
    title: "Nombres",
    dataIndex: "nombres",
    key: "name",
  },
  {
    title: "Apellidos",
    dataIndex: "apellidos",
    key: "apellidos",
  },
  {
    title: "Rut",
    dataIndex: "rut",
    key: "rut",
    render: (text) => (
      <div style={{ textOverflow: "clip !important", whiteSpace: "nowrap" }}>
        {text}
      </div>
    ),
  },
  {
    title: "Correo",
    dataIndex: "correo",
    key: "correo",
  },
  {
    title: "Acciones",
    dataIndex: "id",
    key: "id",
    render: (record) => (
      <Row
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <Col>
          <Tooltip title="Ver información del alumno">
            <Link
              to={`/administrador/alumnos/${record}`}
              state={{ id: record }}
            >
              <EyeOutlined />
            </Link>
          </Tooltip>
        </Col>
        <Col>
          <Paragraph
            copyable={{
              text: record,
              tooltips: ["Copiar ID del alumno", "ID copiado"],
            }}
          ></Paragraph>
        </Col>
        <Col>
          <DeleteParentStudent data={record} />
        </Col>
      </Row>
    ),
  },
];
