import React, { useState, useEffect } from "react";
import { Button, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { APPEND_COURSE_STUDENT_ADMIN } from "@infrastructure/sagas/types/admin";

const AppendStudent = () => {
  const [idEstudiante, setIdEstudiante] = useState();
  const dispatch = useDispatch();

  const agregarEstudiante = () => {
    if (idEstudiante) {
      dispatch({ type: APPEND_COURSE_STUDENT_ADMIN, payload: idEstudiante });
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
        onChange={(e) => setIdEstudiante({ id_estudiante: e.target.value })}
      />
    </Input.Group>
  );
};

export default AppendStudent;
