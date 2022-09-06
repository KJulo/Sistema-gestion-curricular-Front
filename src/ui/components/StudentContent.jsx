import React from 'react';

//components
import Notifications from '@components/Notifications';

// antd
import { Layout, Typography } from 'antd';
const { Content } = Layout;
const { Title, Text } = Typography;

// styles
import '@styles/Home.less';

// assets
import SchoolImg from '@logos/school-img.png';

const StudentContent = ({ user }) => {
  return (
    <div
      className='site-layout-background'
      style={{
        margin: '24px 16px',
        minHeight: 280,
      }}>
      <Title>
        {' '}
        Hola, {user.nombres} {user.apellidos} !
      </Title>

      <div
        className='container-bg flex-container'
        style={{ padding: '1rem', justifyContent: 'space-around' }}>
        <img src={SchoolImg} alt='Logo Colegio' style={{ margin: 10 }} />
        <Notifications />
      </div>
    </div>
  );
};

export default StudentContent;
