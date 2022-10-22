import React from "react";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
      <span>
        <Link to={`/administrador/alumnos/${record}`} state={{ id: record }}>
          <EyeOutlined style={{ marginRight: "8px" }} /> Ver
        </Link>
      </span>
    ),
  },
];

export const columnsCourse = [
  {
    title: "Nombres",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Apellidos",
    dataIndex: "surname",
    key: "surname",
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
    title: "Fecha de nacimiento",
    dataIndex: "anho",
    key: "anho",
  },
  {
    title: "Acciones",
    render: (record) => (
      <span>
        <Link to={`/administrador/alumnos/${record}`} state={{ id: record }}>
          <EyeOutlined style={{ marginRight: "8px" }} />
        </Link>
        <a>
          <DeleteOutlined />
        </a>
      </span>
    ),
  },
];
