import React, { useState } from "react";

import Card from "@components/Card";

import { Modal, Typography } from "antd";
const { Title, Paragraph } = Typography;

const StudentsCards = ({ students }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // TODO terminar el modal de informacion del alumno
  function handdleOpenModal(a) {
    console.log(a);
    setModalOpen(true);
  }
  function handdleOkModal() {
    setModalOpen(false);
  }

  return (
    <>
      <div className="card-container">
        {students.map((student) => (
          <Card
            onClick={() => handdleOpenModal(student)}
            title={student.nombres + " " + student.apellidos}
            content={student.curso.nombre + " " + student.curso.paralelo}
            icon="user"
          />
        ))}
      </div>

      <Modal
        title="Información del alumno"
        open={modalOpen}
        onOk={handdleOkModal}
        onCancel={handdleOkModal}
        cancelButtonProps={{ style: { display: "none" } }}>
        <Title level={4}>Notas</Title>
        <Paragraph>
          <blockquote>bloque</blockquote>
        </Paragraph>
        <Title level={4}>Asistencia</Title>
      </Modal>
    </>
  );
};

export default StudentsCards;
