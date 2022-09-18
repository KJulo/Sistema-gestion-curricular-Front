import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const content = [
  {
    key: "1",
    name: "Matematicas - Primero basico",
    anho: "2020",
  },
  {
    key: "2",
    name: "Lenguaje - Primero basico",
    anho: "2020",
  },
  {
    key: "3",
    name: "Matematicas - Segundo basico",
    anho: "2020",
  },
  {
    key: "4",
    name: "Lenguaje - Segundo basico",
    anho: "2020",
  },
  {
    key: "5",
    name: "Matematicas - Tercero basico",
    anho: "2020",
  },
  {
    key: "6",
    name: "Lenguaje - Tercero basico",
    anho: "2020",
  },
  {
    key: "7",
    name: "Matematicas - Cuarto basico",
    anho: "2020",
  },
  {
    key: "8",
    name: "Lenguaje - Cuarto basico",
    anho: "2020",
  },
  {
    key: "9",
    name: "Matematicas - Quinto basico",
    anho: "2020",
  },
  {
    key: "10",
    name: "Lenguaje - Quinto basico",
    anho: "2020",
  },
  {
    key: "11",
    name: "Matematicas - Sexto basico",
    anho: "2020",
  },
  {
    key: "12",
    name: "Lenguaje - Sexto basico",
    anho: "2020",
  },
  {
    key: "13",
    name: "Matematicas - Septimo basico",
    anho: "2020",
  },
  {
    key: "14",
    name: "Lenguaje - Septimo basico",
    anho: "2020",
  },
  {
    key: "15",
    name: "Matematicas - Octavo basico",
    anho: "2020",
  },
  {
    key: "16",
    name: "Lenguaje - Octavo basico",
    anho: "2020",
  },
  {
    key: "17",
    name: "Matematicas - Primero medio",
    anho: "2020",
  },
  {
    key: "18",
    name: "Lenguaje - Primero medio",
    anho: "2020",
  },
  {
    key: "19",
    name: "Matematicas - Segundo medio",
    anho: "2020",
  },
  {
    key: "20",
    name: "Lenguaje - Segundo medio",
    anho: "2020",
  },
  {
    key: "21",
    name: "Matematicas - Tercero medio",
    anho: "2020",
  },
  {
    key: "22",
    name: "Lenguaje - Tercero medio",
    anho: "2020",
  },
  {
    key: "23",
    name: "Matematicas - Cuarto medio",
    anho: "2020",
  },
  {
    key: "24",
    name: "Lenguaje - Cuarto medio",
    anho: "2020",
  },
];

export const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Año",
    dataIndex: "anho",
    key: "anho",
    fixed: "left",
  },
  {
    title: "Editar",
    key: "actions",
    render: (record) => {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log(record);
          }}
        >
          <EyeOutlined style={{ marginRight: "6px" }} />
          <Link to={`${record.key}`}>Ver</Link>
        </div>
      );
    },
  },
];
