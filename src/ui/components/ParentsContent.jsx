import React from 'react';

// antd
import { Layout, Typography } from 'antd';
const { Content } = Layout;
const { Title, Text } = Typography;

// assets
import SchoolImg from '@logos/school-img.png';

// styles
import '@styles/Home.less';

//components
import Notifications from '@components/Notifications';
import Card from '@components/Card';

const ParentsContent = ({ parent, students }) => {

  // const studentsCards = (studentsList) => {
  //   console.log(studentsList);
  //   return studentsList.map((student) => (
  //     <Card
  //       title={student.nombres + ' ' + student.apellidos}
  //       content={student.curso}
  //     />
  //   ))
  // }

  return (
    <div
      className='site-layout-background'
      style={{
        margin: '24px 16px',
        minHeight: 280,
      }}>
      <Title>
        {' '}
        Hola, {parent.nombres} {parent.apellidos} !
      </Title>

      <Card title="" content="" />

      <div
        className='container-bg flex-container'
        style={{ padding: '1rem', justifyContent: 'space-around' }}>
        <img src={SchoolImg} alt='Logo Colegio' className='fit-image' />
        <Notifications />
      </div>

      {/* <div>
        {studentsCards(students)}
      </div> */}
    </div>
  );
};

export default ParentsContent;
