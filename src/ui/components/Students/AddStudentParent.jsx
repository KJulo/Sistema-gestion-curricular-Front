import React, { useState, useEffect } from "react";
import { Button, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { UPDATE_STUDENT_ADMIN } from "@infrastructure/sagas/types/admin";

const AddStudentParent = ({ data }) => {
  const [idApoderado, setIdApoderado] = useState();
  const dispatch = useDispatch();

  const agregarEstudiante = () => {
    if (idApoderado) {
      dispatch({
        type: UPDATE_STUDENT_ADMIN,
        payload: { id: data, id_apoderado: idApoderado },
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
        placeholder="ID del apoderado"
        onChange={(e) => setIdApoderado(e.target.value)}
      />
    </Input.Group>
  );
};

export default AddStudentParent;
