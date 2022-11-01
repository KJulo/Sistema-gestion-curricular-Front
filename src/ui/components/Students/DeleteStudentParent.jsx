import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { UPDATE_STUDENT_ADMIN } from "../../../infrastructure/sagas/types/admin";
import { useDispatch } from "react-redux";

const DeleteStudentParent = ({ data }) => {
  const dispatch = useDispatch();
  const deleteParent = () => {
    dispatch({
      type: UPDATE_STUDENT_ADMIN,
      payload: { id: data, id_apoderado: null },
    });
  };
  return (
    <Popconfirm
      title="¿Estás seguro de que quieres eliminar el apoderado del alumno?"
      onConfirm={deleteParent}
      okText="Si"
      cancelText="No"
    >
      <Button type="danger">
        <DeleteOutlined /> Eliminar apoderado
      </Button>
    </Popconfirm>
  );
};

export default DeleteStudentParent;
