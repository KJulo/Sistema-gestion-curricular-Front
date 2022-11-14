import React, { useState } from "react";

import Card from "@components/Card";

import { Modal, Typography } from "antd";
import { getAverage } from "@utils/maths";
const { Title, Paragraph, Text } = Typography;

const StudentCards = ({ student }) => {
  const [modalOpen, setModalOpen] = useState(false);

  function handdleOpenModal(a) {
    setModalOpen(true);
  }
  function handdleOkModal() {
    setModalOpen(false);
  }

  return (
    <>
      <Card
        onClick={() => handdleOpenModal(student)}
        title={`${student.nombres} ${student.apellidos}`}
        content={`${student.curso.nombre} ${student.curso.paralelo}`}
        icon="user"
      />

      <Modal
        title="Información del alumno"
        open={modalOpen}
        onOk={handdleOkModal}
        onCancel={handdleOkModal}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Title level={4}>Notas</Title>
        <Paragraph>
          <blockquote>
            <StudentMarks student={student} />
          </blockquote>
        </Paragraph>
        <Title level={4}>Asistencia</Title>
        <Paragraph>
          <blockquote>
            <StudentAttendance student={student} />
          </blockquote>
        </Paragraph>
      </Modal>
    </>
  );
};

const StudentMarks = ({ student }) => {
  if (student.nota.length > 0) {
    const total = student.nota.length;
    const studentAverage = getAverage(student.nota).toFixed(2);
    return (
      <>
        Total de notas:
        <Text style={{ color: "black" }}>{` ${total}`}</Text>
        <br></br>
        Promedio del alumno:
        <Text
          style={{ color: studentAverage < 4 ? "red" : "blue" }}
        >{` ${studentAverage}`}</Text>
        <br></br>
      </>
    );
  } else {
    return <Text>No hay registro de notas.</Text>;
  }
};

const StudentAttendance = ({ student }) => {
  const attendance = student.asistencia;
  if (attendance.length > 0) {
    const total = attendance.length;
    const sum = attendance.reduce((acum, att) => {
      return acum + att.asistencia === "Si" || att.asistencia === "Justificado"
        ? 1
        : 0;
    }, 0);
    return (
      <>
        Clases totales:
        <Text style={{ color: "black" }}>{` ${total}`}</Text>
        <br></br>
        Días asistidos:
        <Text style={{ color: "blue" }}>{` ${sum}`}</Text>
        <br></br>
        Dias inasistidos:
        <Text style={{ color: "red" }}>{` ${total - sum}`}</Text>
        <br></br>
      </>
    );
  } else {
    return <Text>No hay registro de asistencias.</Text>;
  }
};

export default StudentCards;
