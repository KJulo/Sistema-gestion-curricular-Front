import React from 'react';

// antd
import { Typography, Button, Modal } from 'antd';
const { Title } = Typography;

// styles
import '@styles/Home.less';

// components
import { CoursesCards, DefaultTitleContent } from '@components/index';

// constants
import { courses } from '@constants/course';

const Home = () => {

  return (
    <div
      className='body-bg'
      style={{
        padding: 0,
        minHeight: 280,
      }}>
      <DefaultTitleContent title={"Mis Cursos"} action="" />

      <div className='flex-container'>
        <CoursesCards courses={courses} />
      </div>
    </div>
  );
};

export default Home;
