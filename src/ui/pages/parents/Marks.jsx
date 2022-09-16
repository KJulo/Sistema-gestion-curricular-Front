import React, { useState, useEffect } from 'react';
import '@styles/Marks.less';

// antd
import { Checkbox, Collapse, Typography, Space, DatePicker, Button } from 'antd';
import { CalendarOutlined, ReconciliationFilled } from '@ant-design/icons';
import moment from 'moment';
const { Title } = Typography;
const { Panel } = Collapse;

// hooks
import { useGetCurrentMonth, useGetCurrentYear, useGetCurrentDay } from '@hooks/useDate';
import { getAverage } from '@hooks/useMath';

// components
import HomeNavBar from '@components/HomeNavBar';

// constants
import { parentsMenu } from '@constants/menu.js';

const course = {
  id: '12s21ksjh2j12k4',
  nombre: '1ro Básico',
  año: '2022',
};

const student = {
  id: '2k1928d9218',
  nombres: 'John',
  apellidos: 'Brown',
  tipo: 'estudiante',
  idCurso: '12s21ksjh2j12k4',
  notas: [
    {
      fecha: '2022-09-02',
      asignatura: 'Matemáticas',
      evaluacion: 'Prueba 1 Matemáticas',
      nota: 5.5,
      total: 0.3,
    },
    {
      fecha: '2022-09-03',
      asignatura: 'Matemáticas',
      evaluacion: 'Prueba 2 Matemáticas',
      nota: 6.5,
      total: 0.4,
    },
    {
      fecha: '2022-09-04',
      asignatura: 'Matemáticas',
      evaluacion: 'Prueba 3 Matemáticas',
      nota: 7,
      total: 0.3,
    },
    {
      fecha: '2022-09-06',
      asignatura: 'Lenguaje',
      evaluacion: 'Prueba 1 Lenguaje',
      nota: 5,
      total: 0.3,
    },
    {
      fecha: '2022-09-07',
      asignatura: 'Historia',
      evaluacion: 'Prueba 1 Historia',
      nota: 6,
      total: 0.3,
    },
    {
      fecha: '2022-09-08',
      asignatura: 'Historia',
      evaluacion: 'Prueba 2 Historia',
      nota: 5.5,
      total: 0.4,
    },
    {
      fecha: '2022-09-09',
      asignatura: 'Lenguaje',
      evaluacion: 'Prueba 2 Lenguaje',
      nota: 4,
      total: 0.4,
    },
    {
      fecha: '2022-09-10',
      asignatura: 'Lenguaje',
      evaluacion: 'Prueba 3 Lenguaje',
      nota: 3.5,
      total: 0.3,
    },
    {
      fecha: '2022-09-11',
      asignatura: 'Ingles',
      evaluacion: 'Prueba 1 Inglés',
      nota: 1.5,
      total: 0.3,
    },
    {
      fecha: '2022-10-07',
      asignatura: 'Ingles',
      evaluacion: 'Prueba 2 Inglés',
      nota: 7,
      total: 0.4,
    },
    {
      fecha: '2022-10-08',
      asignatura: 'Ingles',
      evaluacion: 'Prueba 3 Inglés',
      nota: 6.5,
      total: 0.3,
    },
    {
      fecha: '2022-11-09',
      asignatura: 'Ciencias',
      evaluacion: 'Prueba 1 Ciencias',
      nota: 4.5,
      total: 0.3,
    },
    {
      fecha: '2022-11-10',
      asignatura: 'Ciencias',
      evaluacion: 'Prueba 2 Ciencias',
      nota: 6,
      total: 0.7,
    },
    {
      fecha: '2022-11-11',
      asignatura: 'Ed. Física',
      evaluacion: 'Prueba 1 Ed. Física',
      nota: 5,
      total: 1,
    },
  ],
};

const Marks = () => {
  const currentDate = useGetCurrentDay() + '-' + useGetCurrentMonth() + '-' + useGetCurrentYear();
  const [userState, setUserState] = useState(student);

  return (
    <div
      className='site-page-header-ghost-wrapper home-grid-layout all-height'
      style={{ margin: '0 40px 0 0', padding: 0 }}>
      <aside className='container-bg-mobile'>
        <HomeNavBar toppics={parentsMenu} user={student} className='NavBar' />
      </aside>

      <div className='content' style={{ margin: '60px 10px 50px 10px', width: '95%' }}>
        <div className='header-container'>
          <Title>Notas</Title>
          <Space direction='vertical'>
            <div className='date-container'>
              <Title level={5} style={{ marginBottom: 5 }}>
                {currentDate}
              </Title>
              <CalendarOutlined twoToneColor='#bfbfbf' style={{ fontSize: 'large' }} />
            </div>
            <div className='average-container'>
              <Title level={5} style={{ marginBottom: 5 }}>
                Promedio {getAverage(userState.notas, 2)}
              </Title>
              <ReconciliationFilled style={{ fontSize: 'large' }} />
            </div>
          </Space>
        </div>

        <Title level={3}>
          {student.nombres} {student.apellidos}
        </Title>
        <table className='table'>
          <thead className='thead'>
            <tr className='trHead'>
              <th>Fecha</th>
              <th>Evaluación</th>
              <th>Nota</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {userState.notas.map((mark, index) => (
              <tr className='trBody' key={index}>
                <td>{mark.fecha}</td>
                <td>{mark.evaluacion}</td>
                <td>{mark.nota}</td>
                <td>{mark.total * 100}%</td>
              </tr>
            ))}
            <tr className='trBody'>
              <td>-</td>
              <td>-</td>
              <td>Promedio: {getAverage(userState.notas, 2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
