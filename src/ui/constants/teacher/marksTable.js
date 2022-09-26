import React from "react";

export const columns = [
  {
    title: "Nombre",
    dataIndex: "nombres",
    key: "nombres",
    fixed: "left",
    width: 100,
  },
  {
    title: "Rut",
    dataIndex: "rut",
    key: "rut",
  },
  {
    title: "Promedio",
    dataIndex: "notas",
    key: "notas",
    render: (record) => {
      return (
        <div>
          { record.reduce((acum, i) => {
              return acum + ( i.nota * i.ponderacion );
            }, 0).toFixed(2) }
        </div>
      );
    },
  }
];