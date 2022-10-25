import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const content = [
  {
    key: "1",
    course: "Primero basico",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "2",
    course: "Segundo basico",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "3",
    course: "Tercero basico",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "4",
    course: "Cuarto basico",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "5",
    course: "Quinto basico",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "6",
    course: "Sexto basico",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "7",
    course: "Septimo basico",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "8",
    course: "Octavo basico",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "9",
    course: "Primero medio",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "10",
    course: "Segundo medio",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "11",
    course: "Tercero medio",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "12",
    course: "Cuarto medio",
    subject: "Matematicas",
    anho: "2020",
  },
  {
    key: "13",
    course: "primero basico",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "14",
    course: "Segundo basico",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "15",
    course: "Tercero basico",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "16",
    course: "Cuarto basico",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "17",
    course: "Quinto basico",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "18",
    course: "Sexto basico",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "19",
    course: "Septimo basico",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "20",
    course: "Octavo basico",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "21",
    course: "Primero medio",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "22",
    course: "Segundo medio",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "23",
    course: "Tercero medio",
    subject: "Lenguaje",
    anho: "2020",
  },
  {
    key: "24",
    course: "Cuarto medio",
    subject: "Lenguaje",
    anho: "2020",
  },
];

export const columns = [
  {
    title: "Curso",
    dataIndex: "nombre",
    key: "nombre",
  },
  {
    title: "Paralelo",
    dataIndex: "paralelo",
    key: "paralelo",
  },
  {
    title: "Año",
    dataIndex: "anho",
    key: "anho",
  },
  {
    title: "Editar",
    dataIndex: "id",
    key: "id",
    render: (record) => {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <Link to={`/administrador/cursos/${record}`} state={{ id: record }}>
            <EyeOutlined style={{ marginRight: "6px" }} />
            Ver
          </Link>
        </div>
      );
    },
  },
];
