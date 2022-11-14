import React from "react";

export const getAverage = (record) => {
  // obtener los id unicos
  const unique = [...new Set(record.map((r) => r.id_asignatura))];
  // obtener distintos arreglos divididos por su asignatura
  const subjectNotes = unique.map((n) => record.filter((r) => r.id_asignatura === n));
  // obtener el ponerado de cada uno
  const notesWeighted = subjectNotes.map((sn) => {
    return sn
      .reduce((acum, i) => {
        return acum + i.nota * i.ponderacion;
      }, 0)
      .toFixed(2);
  });
  // obtener el promedio
  let average = 0;
  notesWeighted.map((sw) => {
    average = average + parseFloat(sw);
  });
  if (average === undefined || !average) {
    average = 0;
  } else {
    average = (average / notesWeighted.length).toFixed(2);
  }
  return average;
};

export const columns = [
  {
    title: "Nombre",
    dataIndex: "nombres",
    key: "nombres",
    fixed: "left",
    width: 80,
  },
  {
    title: "Rut",
    dataIndex: "rut",
    key: "rut",
    width: 110,
  },
  {
    title: "Promedio",
    dataIndex: "notas",
    key: "notas",
    width: 95,
    render: (record) => {
      return <div>{getAverage(record)}</div>;
    },
  },
];
