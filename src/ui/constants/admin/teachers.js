import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Col, Row, Tooltip, Typography } from "antd";
const { Paragraph } = Typography;

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
          <Tooltip title="Ver información del profesor">
            <Link
              to={`/administrador/profesores/${record}`}
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
              tooltips: ["Copiar ID del profesor", "ID copiado"],
            }}
          ></Paragraph>
        </Col>
      </Row>
    ),
  },
];