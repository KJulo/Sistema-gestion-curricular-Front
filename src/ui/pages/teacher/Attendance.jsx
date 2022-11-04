import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@styles/Attendance.less";

// redux
import {
  setIsLoading,
  updateStudentAttendance,
  fetchStudents,
  fetchCourses,
  fetchAttendance,
  addAttendance,
  resetStore,
} from "@slices/teachers";

// antd
import { Button, Alert } from "antd";
import { SwapOutlined, CheckOutlined } from "@ant-design/icons";

//components
import {
  ContentTable,
  SearchContent,
  TeacherFilterCourse,
  DefaultTitleContent,
  FilterSubject,
} from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { columns, status } from "@constants/teacher/attendanceTable";

const Attendance = () => {
  const dispatch = useDispatch();
  const content = useSelector((store) => store.teacher.students.list);
  const courses = useSelector((store) => store.teacher.courses.list);
  const { activeFilters, isLoading } = useSelector((store) => store.teacher);
  const [studentsFiltered, setStudentsFiltered] = useState(content);
  const [selectedCourseSubjects, setSelectedCourseSubjects] = useState([]);
  const [alertActive, setAlertActive] = useState(false);

  useEffect(() => {
    // TODO: se cae cuando se entre desde otro modulo a este de asistencia
    dispatch(resetStore());
    dispatch(fetchCourses());
    dispatch(fetchStudents());
    dispatch(fetchAttendance());
  }, []);

  // Inicializar las asistencias de los estudiantes al cambiar la fecha
  useEffect(() => {
    if (activeFilters && activeFilters.courseId) {
      const selectedCourse = courses.find((c) => c.id === activeFilters.courseId);
      setSelectedCourseSubjects(selectedCourse.asignaturas);
    }
  }, [activeFilters, content.length > 0]);

  // Filtro de curso y fecha
  useEffect(() => {
    const condition =
      activeFilters.hasOwnProperty("courseId") && activeFilters.hasOwnProperty("selectedDate");
    if (condition) {
      const studentsByCourse = content.filter((c) => c.id_curso === activeFilters.courseId);
      const studentsByDate = studentsByCourse.map((student) => {
        // Retorno en caso que todo falle
        const defaultReturn = {
          ...student,
          asistencia: {},
        };

        // Buscar en el arreglo de asistencia la asistencia con fecha correspondiente
        const attendanceFinded = student.asistencia.find(
          (a) => a.fecha === activeFilters.selectedDate
        );
        if (attendanceFinded) {
          return {
            ...student,
            asistencia: attendanceFinded,
          };
        } else {
          return defaultReturn;
        }
      });
      setStudentsFiltered(studentsByDate);
    }
  }, [activeFilters, content]);

  // Al hacer click en el icono de switch, cambiar estado de asiste
  const handleClick = (record) => {
    const lengthStatus = status.length;
    const nextStatusIndex = status.indexOf(record.asistencia.asistencia) + 1;
    const newStatusIndex = nextStatusIndex <= lengthStatus - 1 ? nextStatusIndex : 0;
    dispatch(
      updateStudentAttendance({
        id: record.id,
        asistencia: {
          fecha: activeFilters.selectedDate,
          asistencia: status[newStatusIndex],
          id: record.asistencia.asistencia.id,
        },
      })
    );
  };

  const onSaveChanges = (content) => {
    const { students, filters } = content;
    const condition =
      activeFilters &&
      activeFilters.courseId &&
      activeFilters.selectedDate &&
      activeFilters.subjectId;

    if (condition || condition !== undefined) {
      setAlertActive(false);
      // TODO comprobar si existe o no asistencia registrada para no regitrarla solo 2 veces y solo editarla
      students.map((student) => {
        const params = {
          id_asignatura: filters.subjectId,
          id_alumno: student.id,
          asistencia: student.asistencia.asistencia ?? "No",
          fecha: filters.selectedDate,
        };
        dispatch(addAttendance(params));
      });
    } else {
      setAlertActive(true);
    }
  };

  // Columna de edición, se agrega ahora con un concat
  const editColumn = [
    {
      title: "Editar",
      key: "action",
      render: (record) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleClick(record);
            }}>
            <a>
              <SwapOutlined style={{ marginRight: "6px" }} /> Cambiar
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DefaultTitleContent title={"Módulo Asistencia"} action="" />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <AdminTableLayout
          searchInput={""}
          selectFilter={<TeacherFilterCourse courses={courses} includeDate={true} />}
          extraFilter={<FilterSubject subjects={selectedCourseSubjects} />}
          tableContent={
            <ContentTable
              content={studentsFiltered}
              columns={columns.concat(editColumn)}
              scroll={false}
            />
          }
        />
        <br></br>
        <Button
          onClick={() => onSaveChanges({ students: studentsFiltered, filters: activeFilters })}
          type="primary"
          shape="round"
          icon={<CheckOutlined />}
          size="middle"
          loading={isLoading}>
          Guardar Cambios
        </Button>
        {alertActive ? (
          <Alert
            style={{ marginTop: 20 }}
            message="Porfavor, seleccione un curso, asignatura y fecha."
            type="warning"
            showIcon
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Attendance;
