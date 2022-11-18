import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { UPDATE_PARENT_STUDENTS_ADMIN } from "@infrastructure/sagas/types/admin";

const AddParentStudent = ({ data, students }) => {
  const [idAlumno, setIdAlumno] = useState();
  const dispatch = useDispatch();

  const agregarEstudiante = () => {
    if (idAlumno) {
      const studentExist = students.some((student) => student.id === idAlumno);
      if (studentExist) {
        message.error("El estudiante ya está agregado");
      } else {
        dispatch({
          type: UPDATE_PARENT_STUDENTS_ADMIN,
          payload: { id: idAlumno, id_apoderado: data },
        });
      }
    }
  };
  return (
    <Input.Group>
      <Button
        type="primary"
        style={{ width: "30%" }}
        onClick={agregarEstudiante}
        icon={<PlusOutlined />}
      ></Button>
      <Input
        style={{ width: "70%" }}
        placeholder="ID del alumno"
        onChange={(e) => setIdAlumno(e.target.value)}
      />
    </Input.Group>
  );
};

export default AddParentStudent;
