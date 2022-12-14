import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Col, Row, Tooltip, Typography } from "antd";
const { Paragraph } = Typography;
export const content = [
  {
    key: "1",
    name: "Ignacio",
    surname: "Silva",
    rut: "12345678-9",
    correo: "example@example.com",
    anho: "25/11/1999",
  },
  {
    key: "2",
    name: "Juan",
    surname: "Perez",
    rut: "12345678-9",
    correo: "example@example.com",
    anho: "25/11/1999",
  },
  {
    key: "3",
    name: "Pedro",
    surname: "Gomez",
    rut: "12345678-9",
    correo: "example@example.com",
    anho: "25/11/1999",
  },
  {
    key: "4",
    name: "Maria",
    surname: "Lopez",
    rut: "12345678-9",
    correo: "example@example.com",
    anho: "1/2/1962",
  },
];

export const columns = [
  {
    title: "Nombres",
    dataIndex: "nombres",
    key: "nombres",
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
          <Tooltip title="Ver información del apoderado">
            <Link
              to={`/administrador/apoderados/${record}`}
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
              tooltips: ["Copiar ID del apoderado", "ID copiado"],
            }}
          ></Paragraph>
        </Col>
      </Row>
    ),
  },
];
