import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@styles/Attendance.less';

// redux
import {
  updateStudentAttendance,
  fetchStudents,
  fetchCourses,
  fetchAttendance,
  addAttendance,
} from '@slices/teachers';

// antd
import { Button } from 'antd';
import { SwapOutlined, CheckOutlined } from "@ant-design/icons";

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

const Attendance = () => {
  const dispatch = useDispatch();
  const content = useSelector((store) => store.teacher.students.list);
  const { activeFilters } = useSelector((store) => store.teacher);
  const { isLoading } = useSelector((store) => store.teacher);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchStudents());
    dispatch(fetchAttendance());
  }, [])

  // Inicializar las asistencias de los estudiantes al cambiar la fecha
  useEffect(() => {
    initAttendance();
  }, [activeFilters, content.length>0])

  function initAttendance () {
    content.map((student) => {
      dispatch(updateStudentAttendance({ id: student.id, asistencia: { fecha: activeFilters.selectedDate, asiste: false} }));
    })
  }
  
  // Al hacer click en el icono de switch, cambiar estado de asiste
  const handleClick = (record) => {
    const cambio = record.asistencia.asiste ? false : true;
    dispatch(updateStudentAttendance({ id: record.id, asistencia: { fecha: activeFilters.selectedDate, asiste: cambio} }));
  }

  const onSaveChanges = (content) => {
    dispatch(addAttendance(content));
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
            <SwapOutlined style={{ marginRight: "6px" }} /> Cambiar
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
        <br></br>
        <Button onClick={()=>onSaveChanges(content)} type="primary" shape="round" icon={<CheckOutlined />} size="middle" loading={isLoading}>
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};

export default Attendance;