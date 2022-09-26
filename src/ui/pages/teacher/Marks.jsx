import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { updateStudentAttendance } from '@slices/teachers';

// antd
import { SwapOutlined } from "@ant-design/icons";

//components
import {
  ContentTable,
  SearchContent,
  TeacherFilterCourse,
  DefaultTitleContent,
} from '@components/index';

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { columns } from "@constants/teacher/attendanceTable";

const Marks = () => {
  const dispatch = useDispatch();
  const content = useSelector((store) => store.teacher.students.attendance);
  
  // Al hacer click en el icono de switch, cambiar estado de asiste
  const handleClick = (record) => {
    const cambio = record.asistencia ? false : true;
    dispatch(updateStudentAttendance({ id: record.id, asistencia: cambio }));
  }

  // Columna de edición, se agrega ahora con un concat
  const editColumn = [{
    title: "Editar",
    key: "action",
    render: (record) => {
      return (
        <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          handleClick(record)
        }}
        >
          <a>
            <SwapOutlined style={{ marginRight: "6px" }} /> Editar
          </a>
        </div>
      );
    },
  }]
  
  return (
    <div>
      <DefaultTitleContent title={"Módulo Asistencia"} action="" />
      <div
        style={true ? {} : { pointerEvents: "none" }}
      >
        <AdminTableLayout
          searchInput={""}
          selectFilter={<TeacherFilterCourse />}
          tableContent={
            <ContentTable
              content={content}
              columns={columns.concat(editColumn)}
              type="course"
            />
          }
        />
      </div>
    </div>
  );
};

export default Marks;