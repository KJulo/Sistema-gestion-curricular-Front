import React, { useState } from "react";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { UPDATE_PARENT_STUDENTS_ADMIN } from "@infrastructure/sagas/types/admin";

const AddParentStudent = ({ data }) => {
  const [idAlumno, setIdAlumno] = useState();
  const dispatch = useDispatch();

  const agregarEstudiante = () => {
    if (idAlumno) {
      dispatch({
        type: UPDATE_PARENT_STUDENTS_ADMIN,
        payload: { id: idAlumno, id_apoderado: data },
      });
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
        placeholder="ID del estudiante"
        onChange={(e) => setIdAlumno(e.target.value)}
      />
    </Input.Group>
  );
};

export default AddParentStudent;
