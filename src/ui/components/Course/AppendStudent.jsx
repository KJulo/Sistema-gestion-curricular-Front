import React, { useState, useEffect } from "react";
import { Button, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { APPEND_COURSE_STUDENT_ADMIN } from "@infrastructure/sagas/types/admin";

const AppendStudent = ({ type, data }) => {
  const [idEstudiante, setIdEstudiante] = useState();
  const dispatch = useDispatch();
  

  const agregarEstudiante = () => {
    if (idEstudiante) {
      if (type === "course") {
        console.log("agregar estudiante a curso");
        dispatch({
          type: APPEND_COURSE_STUDENT_ADMIN,
          payload: { id: idEstudiante, id_curso: data },
        });
      } else if (type === "parent") {
        console.log("parent");
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
        placeholder="ID del Alumno"
        onChange={(e) => setIdEstudiante(e.target.value)}
      />
    </Input.Group>
  );
};

export default AppendStudent;
