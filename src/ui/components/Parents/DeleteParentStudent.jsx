import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { DELETE_PARENT_STUDENT_ADMIN } from "@infrastructure/sagas/types/admin";
import { useDispatch } from "react-redux";

const DeleteParentStudent = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <DeleteOutlined
      style={{color:"red"}}
      onClick={() => {
        dispatch({
          type: DELETE_PARENT_STUDENT_ADMIN,
          payload: { id: data, id_apoderado: null },
        });
      }}
    />
  );
};

export default DeleteParentStudent;
