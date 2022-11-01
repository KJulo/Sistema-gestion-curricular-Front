import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { DELETE_PARENT_STUDENT_ADMIN } from "@infrastructure/sagas/types/admin";
import { useDispatch } from "react-redux";

const DeleteParentStudent = ({ data }) => {
  const dispatch = useDispatch();
  const deleteStudent = () => {
    dispatch({
      type: DELETE_PARENT_STUDENT_ADMIN,
      payload: { id: data, id_apoderado: null },
    });
  };
  return (
    <Popconfirm
      title="¿Estás seguro de que quieres eliminar el alumno del apoderado?"
      onConfirm={deleteStudent}
      okText="Si"
      cancelText="No"
    >
      <DeleteOutlined style={{ color: "red" }} />
    </Popconfirm>
  );
};

export default DeleteParentStudent;
