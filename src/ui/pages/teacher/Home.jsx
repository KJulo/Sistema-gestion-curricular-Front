import React, { useState } from 'react';

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
