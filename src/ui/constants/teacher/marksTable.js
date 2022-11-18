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

export const getColumns = (content) => {
  const getMarkTest = (students, test) => {
    return students?.nota.find((marks) => marks.nombre === test);
  };

  // Al hacer click en el icono de switch, cambiar estado de asiste
  const handleClick = (record) => {
    console.log(record);
  };

  // Obtener nombres de los test para las columnas
  const testNames = new Set();
  content?.map((student) => student?.nota?.map((test) => testNames.add(test.nombre)));

  // Columnas adicionales por cada prueba del curso
  const evaluationColumn = Array.from(testNames).map((test) => ({
    title: test,
    key: test.toLowerCase(),
    render: (record) => {
      const nota = getMarkTest(record, test);
      return (
        <div
          style={nota?.nota >= 4 ? { color: "blue" } : { color: "red" }}
          onClick={() => {
            handleClick(record);
          }}>
          {nota?.nota} - {nota?.ponderacion * 100}%
        </div>
      );
    },
  }));

  return columns.concat(evaluationColumn);
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
    dataIndex: "nota",
    key: "nota",
    width: 95,
    render: (record) => {
      return <div>{getAverage(record)}</div>;
    },
  },
];
