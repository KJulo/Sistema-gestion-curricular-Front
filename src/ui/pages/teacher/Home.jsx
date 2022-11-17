import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Slices
import { fetchCourses, fetchForumsAndContent } from "@slices/teachers";

// antd
import { Typography, Button, Modal } from "antd";
const { Title } = Typography;

// styles
import "@styles/Home.less";

// components
import { CoursesCards, DefaultTitleContent, LoadingSpinner } from "@components/index";

// constants
// import { courses } from '@constants/course';
import { useEffect } from "react";

/**
 * TODO
 * * Para los objetivos apilar todos en un arreglo y hacerle un JSON.stringify(arr) para enviarlo a la bd
 * ! Recordar ponerle fecha de inicio y final a la unidad en el backend
 */

const Home = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    courses: { management, list: courses },
  } = useSelector((store) => store.teacher);

  // Buscar cursos si es que no hay
  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, []);

  useEffect(() => {
    if (courses.length > 0) dispatch(fetchForumsAndContent());
  }, [courses.length]);

  return (
    <div
      className="body-bg"
      style={{
        padding: 0,
        minHeight: 280,
      }}>
      <DefaultTitleContent
        title={"Mis Cursos"}
        subtitle="Haz click en uno de los cursos para ir a la planificación."
        action=""
      />
      <div className="flex-container">
        <LoadingSpinner isLoading={courses.length === 0 || isLoading}>
          <CoursesCards courses={courses} management={management} isLoading={isLoading} />
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default Home;
