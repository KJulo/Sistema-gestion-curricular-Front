import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { UPDATE_STUDENT_ADMIN } from "../../../infrastructure/sagas/types/admin";
import { useDispatch } from "react-redux";

const DeleteStudentParent = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() =>
        dispatch({
          type: UPDATE_STUDENT_ADMIN,
          payload: { id: data, id_apoderado: null },
        })
      }
    >
      <DeleteOutlined /> Eliminar apoderado
    </Button>
  );
};

export default DeleteStudentParent;
