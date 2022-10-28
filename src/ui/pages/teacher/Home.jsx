import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Slices
import { fetchCourses } from "@slices/teachers";

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

const Home = () => {
  const dispatch = useDispatch();
  const courses = useSelector((store) => store.teacher.courses.list);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return (
    <div
      className="body-bg"
      style={{
        padding: 0,
        minHeight: 280,
      }}>
      <DefaultTitleContent title={"Mis Cursos"} action="" />
      <div className="flex-container">
        <LoadingSpinner isLoading={courses.length == 0}>
          <CoursesCards courses={courses} />
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default Home;
