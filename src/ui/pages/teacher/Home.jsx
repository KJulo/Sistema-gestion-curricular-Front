import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Slices
import { fetchCourses } from '@slices/teachers';

// antd
import { Typography, Button, Modal } from 'antd';
const { Title } = Typography;

// styles
import '@styles/Home.less';

// components
import { CoursesCards, DefaultTitleContent, LoadingScreen } from '@components/index';

// constants
// import { courses } from '@constants/course';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const courses = useSelector((store) => store.teacher.courses.basicInfo);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [])

  return (
    <div
      className='body-bg'
      style={{
        padding: 0,
        minHeight: 280,
      }}>
      <DefaultTitleContent title={"Mis Cursos"} action="" />

      <div className='flex-container'>
        {courses.length == 0
        ? <LoadingScreen />
        : <CoursesCards courses={courses} />}
      </div>
    </div>
  );
};

export default Home;
