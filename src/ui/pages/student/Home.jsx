import React from 'react';

//components
import Notifications from '@components/Notifications';

// antd
import { Typography } from 'antd';
const { Title } = Typography;

// styles
import '@styles/Home.less';

// assets
import SchoolImg from '@logos/school-img.png';

// constants
import { student } from '@constants/users';


const Home = () => {
  return (
    <div
      className='body-bg'
      style={{
        padding: 30,
        margin: '24px 16px',
        minHeight: 280,
      }}>

      <Title>
        {' '}
        Hola, {student.nombres} {student.apellidos} !
      </Title>

      <div
        className='flex-container'
        style={{ padding: 10, justifyContent: 'space-around' }}>
        <img src={SchoolImg} alt='Logo Colegio' style={{ margin: 10 }} />

        <Notifications />
      </div>
    </div>
  );
};

export default Home;
