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
import { getColumns } from "@constants/teacher/marksTable";

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

  // Update
  useEffect(() => {
    const courseFiltered = courses.find((c) => c.id === activeFilters.courseId);
    const newStudents = content?.filter((c) => c.curso.id === activeFilters.courseId);
    setStudentsFiltered(newStudents);
    setTableColumns(getColumns(newStudents));
    setSelectedCourse(courseFiltered);
  }, [activeFilters, content]);

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
    </div>
  );
};

export default Marks;
