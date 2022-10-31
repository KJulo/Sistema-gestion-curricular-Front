import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";
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
    <Tooltip title="Eliminar alumno del curso.">
      <DeleteOutlined style={{ color: "red" }} onClick={deleteStudentCourse} />
    </Tooltip>
  );
};

export default DeleteStudentCourse;
