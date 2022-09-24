import React, { useEffect, useState } from 'react';

// antd
import { Layout, Typography } from 'antd';
const { Title } = Typography;

// assets
import SchoolImg from '@logos/school-img.png';

// styles
import '@styles/Home.less';

//components
import Notifications from '@components/Notifications';
import Card from '@components/Card';

// constants
import { parents } from '@constants/users';

const Home = () => {
  const [parent, setParent] = useState(parents.parents[0]);
  const [students, setStudents] = useState(parents.students)

  // Seleccionar un padre cualquiera
  useEffect(() => {
    setParent(parents.parents[0])
  }, [])

  const studentsCards = (studentsList) => {
    return (
      <div className='card-container'>
        {studentsList.map((student) => (
          <Card
            title={student.nombres + ' ' + student.apellidos}
            content={student.curso}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className='body-bg'
      style={{
        margin: '24px 16px',
        minHeight: 280,
      }}>
      <Title>
        {' '}
        Hola, {parent.nombres} {parent.apellidos} !
      </Title>

      <div
        className='flex-container'
        style={{ padding: '1rem', justifyContent: 'space-around' }}>
        <div style={ { display: 'contents' } }> 
          <img src={SchoolImg} alt='Logo Colegio' className='fit-image' />
          {studentsCards(students)}
        </div>
        <Notifications />
      </div>
    </div>
  )
};

export default Home;