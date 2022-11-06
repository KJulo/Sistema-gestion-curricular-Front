import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import { fetchStudents, fetchCourses, fetchStudentsNotes, setIsLoading } from "@slices/teachers";

//components
import {
  ContentTable,
  SearchContent,
  TeacherFilterCourse,
  DefaultTitleContent,
  LoadingSpinner,
  AddMark,
} from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { columns } from "@constants/teacher/marksTable";

const getMarkTest = (students, test) => {
  return students.notas
    .map((marks) => (marks.nombre === test ? marks.nota : null)) // devuelve un arreglo con muchos null y una nota
    .find((nota) => nota !== null); // devuelve solo la nota
};

const getColumns = (content) => {
  // Al hacer click en el icono de switch, cambiar estado de asiste
  const handleClick = (record) => {
    console.log(record);
  };

  // Obtener nombres de los test para las columnas
  const testNames = new Set();
  content.map((student) => student.notas.map((test) => testNames.add(test.nombre)));

  // Columnas adicionales por cada prueba del curso
  const testColums = Array.from(testNames).map((test) => ({
    title: test,
    key: test.toLowerCase(),
    render: (record) => {
      return (
        <div
          style={getMarkTest(record, test) >= 4 ? { color: "blue" } : { color: "red" }}
          onClick={() => {
            handleClick(record);
          }}>
          {getMarkTest(record, test)}
        </div>
      );
    },
  }));

  return columns.concat(testColums);
};

const Marks = () => {
  const dispatch = useDispatch();
  const content = useSelector((store) => store.teacher.students.list);
  const {
    activeFilter,
    isLoading,
    courses: { list: courses },
  } = useSelector((store) => store.teacher);
  const [studentsFiltered, setStudentsFiltered] = useState(content);
  const [tableColumns, setTableColumns] = useState(getColumns(content));

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(fetchCourses());
    dispatch(fetchStudents());
    dispatch(fetchStudentsNotes());
    dispatch(setIsLoading(false));
  }, []);

  // Filtro de curso
  useEffect(() => {
    if (activeFilter)
      setStudentsFiltered(content.filter((c) => c.id_curso === activeFilter.courseId));
  }, [activeFilter]);

  useEffect(() => {
    setTableColumns(getColumns(studentsFiltered));
  }, [studentsFiltered]);

  // Al hacer click en el icono de switch, cambiar estado de asiste
  const handleClick = (record) => {
    console.log(record);
  };

  return (
    <div>
      <DefaultTitleContent
        title={"Módulo Notas"}
        subtitle="En este módulo podrás ver y añadir las notas de tus alumnos."
      />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <LoadingSpinner isLoading={isLoading}>
          <AdminTableLayout
            filters={[<TeacherFilterCourse courses={courses} includeDate={false} />, <AddMark />]}
            tableContent={
              <ContentTable content={studentsFiltered} columns={tableColumns} scroll={false} />
            }
          />
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default Marks;
