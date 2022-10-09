import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeacher } from '@slices/teachers';

// antd
import { Typography, Button, Modal } from 'antd';
const { Title } = Typography;

// styles
import '@styles/Home.less';

// components
import { CoursesCards } from '@components/index';

// constants
import { courses } from '@constants/course';

const Home = () => {
  const dispatch = useDispatch();
  const teacher = useSelector((store) => store.teacher.user);
  console.log(teacher);

  useEffect(() => {
    dispatch(fetchTeacher());
  }, [])

  

  return (
    <div
      className='body-bg'
      style={{
        padding: 30,
        paddingTop: 0,
        margin: '0px 16px 20px',
        minHeight: 280,
      }}>
      <Title> Mis Cursos</Title>

      <div className='flex-container'>
        <CoursesCards courses={courses} />
      </div>
    </div>
  );
};

export default Home;
