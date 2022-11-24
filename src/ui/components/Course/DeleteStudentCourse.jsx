import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";
import { DELETE_COURSE_STUDENT_ADMIN } from "@infrastructure/sagas/types/admin";

const DeleteStudentCourse = ({ id }) => {
  const dispatch = useDispatch();

  const deleteStudentCourse = () => {
    dispatch({
      type: DELETE_COURSE_STUDENT_ADMIN,
      payload: { id, id_curso: null },
    });
  };
  return (
    <Popconfirm
      title="¿Desea eliminar el alumno del curso?"
      onConfirm={deleteStudentCourse}
      okText="Si"
      cancelText="No"
    >
      <DeleteOutlined style={{ color: "red" }} />
    </Popconfirm>
  );
};

export default DeleteStudentCourse;
