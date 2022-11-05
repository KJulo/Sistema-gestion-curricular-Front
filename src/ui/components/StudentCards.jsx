import React, { useState } from "react";

import Card from "@components/Card";

import { Modal, Typography } from "antd";
const { Title, Paragraph, Text } = Typography;

const StudentCards = ({ student }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // TODO terminar el modal de informacion del alumno
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
        title={student.nombres + " " + student.apellidos}
        content={student.curso.nombre + " " + student.curso.paralelo}
        icon="user"
      />

      <Modal
        title="Información del alumno"
        open={modalOpen}
        onOk={handdleOkModal}
        onCancel={handdleOkModal}
        cancelButtonProps={{ style: { display: "none" } }}>
        <Title level={4}>Notas</Title>
        <Paragraph>
          <blockquote>{getMarks(student)}</blockquote>
        </Paragraph>
        <Title level={4}>Asistencia</Title>
        <Paragraph>
          <blockquote>{getAttendance(student)}</blockquote>
        </Paragraph>
      </Modal>
    </>
  );
};

function getMarks(student) {
  /**
   * TODO mostrar
   * * promedio alumno, promedio curso, peor y mejor
   */
  if (student.notas.length > 0) {
    return <Text>n</Text>;
  } else {
    return <Text>Sin notas aún.</Text>;
  }
}

function getAttendance(student) {
  const attendance = student.asistencia;
  if (attendance.length > 0) {
    const total = attendance.length;
    const sum = attendance.reduce((acum, att) => {
      return acum + att.asistencia === "Si" || att.asistencia === "Justificado" ? 1 : 0;
    }, 0);
    return (
      <>
        <Text style={{ color: "black" }}>Clases totales: {total}</Text>
        <br></br>
        <Text style={{ color: "blue" }}>Días asistidos: {sum}</Text>
        <br></br>
        <Text style={{ color: "red" }}>Dias inasistidos: {total - sum}</Text>
        <br></br>
      </>
    );
  } else {
    return <Text>Sin notas aún.</Text>;
  }
}

export default StudentCards;
