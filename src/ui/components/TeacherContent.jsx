import React from 'react';

// constants
import { courses } from '@constants/course';

// antd
import { Layout, Typography } from 'antd';
const { Title } = Typography;

// styles
import '@styles/Home.less';

const TeacherContent = ({ user }) => {
  return (
    <div
      className='site-layout-background'
      style={{
        margin: '24px 16px',
        minHeight: 280,
      }}>
      <Title> Mis Cursos</Title>

      <div className='container-bg flex-container'>
        {courses.map((course) => {
          return (
            <div className='course-container'>
              <div className='box-container' />
              {course.nombre}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherContent;
