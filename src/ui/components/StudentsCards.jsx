import React, { useState } from "react";

import Card from "@components/Card";

import { Modal } from "antd";

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
  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="card-container">
        {students.map((student) => (
          <Card
            onClick={() => handdleOpenModal(student)}
            title={student.nombres + " " + student.apellidos}
            content={student.curso}
            icon="user"
          />
        ))}
      </div>

      <Modal
        title="Información del alumno"
        open={modalOpen}
        onOk={handdleOkModal}
        onCancel={handleCancel}>
        Modal
      </Modal>
    </>
  );
};

export default StudentsCards;
