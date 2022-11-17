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
  return students?.nota.find((marks) => marks.nombre === test);
};

const getColumns = (content) => {
  // Al hacer click en el icono de switch, cambiar estado de asiste
  const handleClick = (record) => {
    console.log(record);
  };

  // Obtener nombres de los test para las columnas
  const testNames = new Set();
  content?.map((student) => student?.nota?.map((test) => testNames.add(test.nombre)));

  // Columnas adicionales por cada prueba del curso
  const evaluationColumn = Array.from(testNames).map((test) => ({
    title: test,
    key: test.toLowerCase(),
    render: (record) => {
      const nota = getMarkTest(record, test);
      return (
        <div
          style={nota?.nota >= 4 ? { color: "blue" } : { color: "red" }}
          onClick={() => {
            handleClick(record);
          }}>
          {nota?.nota} - {nota?.ponderacion * 100}%
        </div>
      );
    },
  }));

  return columns.concat(evaluationColumn);
};

const Marks = () => {
  const dispatch = useDispatch();
  const { list: content } = useSelector((store) => store.teacher.students);
  const {
    activeFilters,
    isLoading,
    courses: { list: courses },
  } = useSelector((store) => store.teacher);
  const [studentsFiltered, setStudentsFiltered] = useState(content);
  const [tableColumns, setTableColumns] = useState(getColumns(content));
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchStudents());
    dispatch(fetchStudentsNotes());
  }, []);

  useEffect(() => {
    setStudentsFiltered(content);
  }, [content]);

  // Filtro de curso
  useEffect(() => {
    if (activeFilters)
      setStudentsFiltered(content?.filter((c) => c.curso.id === activeFilters.courseId));
  }, [activeFilters]);

  useEffect(() => {
    setTableColumns(getColumns(studentsFiltered));
    setSelectedCourse(courses.find((c) => c.id === activeFilters?.courseId));
  }, [studentsFiltered]);

  // Al hacer click en el icono de switch, cambiar estado de asiste
  const handleClick = (record) => {
    console.log(record);
  };

  return (
    <LoadingSpinner isLoading={isLoading}>
      <DefaultTitleContent
        title={"Módulo Notas"}
        subtitle="En este módulo podrás ver y añadir las notas de tus alumnos."
      />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <LoadingSpinner isLoading={isLoading}>
          <AdminTableLayout
            filters={[
              <TeacherFilterCourse courses={courses} includeDate={false} />,
              <AddMark
                course={selectedCourse}
                students={studentsFiltered}
                filters={activeFilters}
                isLoading={isLoading}
              />,
            ]}
            tableContent={
              <ContentTable content={studentsFiltered} columns={tableColumns} scroll={false} />
            }
          />
        </LoadingSpinner>
      </div>
    </LoadingSpinner>
  );
};

export default Marks;
