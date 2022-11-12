import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@styles/Attendance.less";

// redux
import {
  setIsLoading,
  setActiveFilter,
  updateStudentAttendance,
  fetchStudents,
  fetchCourses,
  fetchAttendance,
  addAttendance,
  editAttendance,
  resetStore,
} from "@slices/teachers";

// antd
import { Button, Alert, message } from "antd";
import { SwapOutlined, CheckOutlined } from "@ant-design/icons";

//components
import {
  ContentTable,
  SearchContent,
  TeacherFilterCourse,
  DefaultTitleContent,
  FilterSubject,
  DatePicker,
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

  useEffect(() => {
    // TODO: se cae cuando se entre desde otro modulo a este de asistencia
    dispatch(resetStore());
    dispatch(fetchCourses());
    dispatch(fetchStudents());
  }, []);

  useEffect(() => {
    if (content) {
      dispatch(fetchAttendance());
    }
  }, [content.length]);

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
        const isEmpty = JSON.stringify(student.asistencia) === "{}";
        // Buscar en el arreglo de asistencia la asistencia con fecha correspondiente
        if (!isEmpty) {
          const attendanceFinded = student?.asistencia?.find(
            (a) => a.fecha === activeFilters.selectedDate
          );
          if (attendanceFinded) {
            return {
              ...student,
              asistencia: { ...attendanceFinded, registrado: "Si" },
            };
          }
        }
        return {
          ...student,
          asistencia: {
            fecha: activeFilters.selectedDate,
            asistencia: status[0],
            registrado: "No",
          },
        };
      });

      setStudentsFiltered(studentsByDate);
    }
  }, [activeFilters, content]);

  const onChangeDate = (_, dateString) => {
    const dateSplited = dateString.split("/");
    const date = dateSplited[2] + "-" + dateSplited[1] + "-" + dateSplited[0];
    dispatch(setActiveFilter({ selectedDate: date }));
  };

  // Al hacer click en el icono de switch, cambiar estado de asiste
  const handleClick = (record) => {
    const lengthStatus = status.length;
    const nextStatusIndex = status.indexOf(record.asistencia.asistencia) + 1;
    const newStatusIndex = nextStatusIndex <= lengthStatus - 1 ? nextStatusIndex : 0;
    updateAttendance(
      record.id,
      activeFilters.selectedDate,
      status[newStatusIndex],
      record.asistencia.registrado
    );
  };

  function updateAttendance(studentId, date, status, registered) {
    dispatch(
      updateStudentAttendance({
        id: studentId,
        asistencia: {
          fecha: date,
          asistencia: status,
          registrado: registered,
        },
      })
    );
  }

  const onSaveChanges = (content) => {
    const { students, filters } = content;
    if (hasAllConditions(activeFilters)) {
      message.destroy();
      students.map((student) => {
        const params = {
          id_asignatura: filters.subjectId,
          id_alumno: student.id,
          asistencia: student.asistencia.asistencia ?? "No",
          fecha: filters.selectedDate,
        };
        // verificar si la fecha ya fue registrada en el endpoint
        if (hasBeenRegistered(filters.selectedDate) && student.asistencia.id) {
          params["id_asistencia"] = student.asistencia.id;
          dispatch(editAttendance(params));
        } else {
          dispatch(addAttendance(params));
        }
      });
    }
  };

  function hasAllConditions(filters) {
    const condition = filters && filters.courseId && filters.selectedDate && filters.subjectId;
    // Si no se cumple con algo
    if (!condition) {
      message.destroy();
      if (!filters.courseId) message.warning("Seleccione el curso a registrar.");
      if (!filters.selectedDate) message.warning("Seleccione una fecha para registrar.");
      if (!filters.subjectId) message.warning("Seleccione la asignatura a registrar.");
    } else {
      return true;
    }
  }

  function hasBeenRegistered(filterDate) {
    if (studentsFiltered) {
      let dateFound = false;
      for (let i = 0; i < content.length; i++) {
        if (content[i].asistencia.find((a) => a.fecha === filterDate && a.registrado === "Si")) {
          dateFound = true;
          break;
        }
      }
      return dateFound;
    }
  }

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

  useEffect(() => {
    if (isLoading) {
      message.destroy();
    }
  }, [isLoading]);

  console.log(onChangeDate, courses, selectedCourseSubjects);

  return (
    <div>
      <DefaultTitleContent
        title={"Módulo Asistencia"}
        subtitle="En este módulo podrás ver, añadir y editar la asistencia de tus alumnos."
      />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <AdminTableLayout
          filters={[
            <DatePicker onChange={onChangeDate} />,
            <TeacherFilterCourse courses={courses} includeDate={true} />,
            <FilterSubject subjects={selectedCourseSubjects} />,
          ]}
          tableContent={
            <ContentTable
              content={studentsFiltered}
              columns={columns.concat(editColumn)}
              scroll={false}
            />
          }
          isLoading={isLoading}
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
      </div>
    </div>
  );
};

export default Attendance;
