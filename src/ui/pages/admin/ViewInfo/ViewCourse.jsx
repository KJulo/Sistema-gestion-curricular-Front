import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DefaultTitleContent,
  ContentTable,
  SubTitleContent,
  AddStudent,
  EditCourse,
} from "@components/index";
import { AdminTableLayout } from "@containers/index";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

//constants
import {
  content as contentStudents,
  columnsCourse as columnsStudents,
} from "@constants/admin/students";
import {
  content as contentTeachers,
  columnsCourse as columnsTeachers,
} from "@constants/admin/teachers";

import {
  FETCH_COURSE_ADMIN,
  DELETE_COURSE_ADMIN,
} from "@infrastructure/sagas/types/admin";

import { Divider, Button, Popconfirm, message } from "antd";

const ViewCourse = () => {
  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_COURSE_ADMIN, payload: id });
  }, []);

  const confirm = (e) => {
    dispatch({
      type: DELETE_COURSE_ADMIN,
      payload: { id: id, navigate },
    });
    message.success("Curso eliminado con exito.");
  };

  const { course } = useSelector((store) => store.admin);
  if (course) {
    return (
      <>
        <DefaultTitleContent
          title={
            course.nombre !== undefined
              ? `${course.nombre} - ${course.paralelo}`
              : ""
          }
          action={
            <div>
              <EditCourse course={course} />
              <Popconfirm
                title="¿Estás seguro de que quieres eliminar este curso?"
                onConfirm={confirm}
                okText="Si"
                cancelText="No"
              >
                <Button type="danger">
                  <DeleteOutlined /> Eliminar
                </Button>
              </Popconfirm>
            </div>
          }
        />
        <Divider />

        {/* //TODO agregar el componente del profesor para agregarlo o eliminarlo del curso */}

        <Divider />

        <div>
          <SubTitleContent title="Estudiante(s)" action={<AddStudent />} />
          <AdminTableLayout
            title="Alumnos"
            tableContent={
              <ContentTable
                content={contentStudents}
                columns={columnsStudents}
                type="student"
              />
            }
          />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ViewCourse;
