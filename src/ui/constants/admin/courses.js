import react from "react";
import { EditFilled } from "@ant-design/icons";

export const content = [
  {
    name: "Matematicas - Primero basico",
    anho: "2020",
  },
  {
    name: "Lenguaje - Primero basico",
    anho: "2020",
  },
  {
    name: "Matematicas - Segundo basico",
    anho: "2020",
  },
  {
    name: "Lenguaje - Segundo basico",
    anho: "2020",
  },
  {
    name: "Matematicas - Tercero basico",
    anho: "2020",
  },
  {
    name: "Lenguaje - Tercero basico",
    anho: "2020",
  },
  {
    name: "Matematicas - Cuarto basico",
    anho: "2020",
  },
  {
    name: "Lenguaje - Cuarto basico",
    anho: "2020",
  },
  {
    name: "Matematicas - Quinto basico",
    anho: "2020",
  },
  {
    name: "Lenguaje - Quinto basico",
    anho: "2020",
  },
  {
    name: "Matematicas - Sexto basico",
    anho: "2020",
  },
  {
    name: "Lenguaje - Sexto basico",
    anho: "2020",
  },
  {
    name: "Matematicas - Septimo basico",
    anho: "2020",
  },
  {
    name: "Lenguaje - Septimo basico",
    anho: "2020",
  },
  {
    name: "Matematicas - Octavo basico",
    anho: "2020",
  },
  {
    name: "Lenguaje - Octavo basico",
    anho: "2020",
  },
  {
    name: "Matematicas - Primero medio",
    anho: "2020",
  },
  {
    name: "Lenguaje - Primero medio",
    anho: "2020",
  },
  {
    name: "Matematicas - Segundo medio",
    anho: "2020",
  },
  {
    name: "Lenguaje - Segundo medio",
    anho: "2020",
  },
  {
    name: "Matematicas - Tercero medio",
    anho: "2020",
  },
  {
    name: "Lenguaje - Tercero medio",
    anho: "2020",
  },
  {
    name: "Matematicas - Cuarto medio",
    anho: "2020",
  },
  {
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
          }}
        >
          <EditFilled className="action-cell__icon" />
          <Text className="action-cell__label">Editar</Text>
        </div>
      );
    },
  },
];
