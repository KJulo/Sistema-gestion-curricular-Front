import React from "react";
import {
  DefaultTitleContent,
  ContentTable,
  SubTitleContent,
  AddStudent,
  AddTeacher,
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

import { Divider, Button } from "antd";

const ViewCourse = () => {
  const cursoExample = {
    key: "24",
    name: "Lenguaje - Cuarto medio",
    anho: "2020",
  };

  return (
    <>
      <DefaultTitleContent
        title={cursoExample.name}
        action={
          <div>
            <Button style={{ marginRight: "20px" }}>
              <EditOutlined /> Editar
            </Button>
            <Button>
              <DeleteOutlined />
              Eliminar
            </Button>
          </div>
        }
      />
      <Divider />

      <div>
        <SubTitleContent title="Profesor(es):" action={<AddTeacher />} />
        <AdminTableLayout
          tableContent={
            <ContentTable
              content={contentTeachers}
              columns={columnsTeachers}
              type="course"
            />
          }
        />
      </div>

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
};

export default ViewCourse;
