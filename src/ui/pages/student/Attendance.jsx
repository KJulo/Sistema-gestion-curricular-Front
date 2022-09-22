import React, { useState, useEffect } from 'react';
import '@styles/Attendance.less';

// antd
import { Checkbox, Collapse, Typography, Space, DatePicker, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Title } = Typography;
const { Panel } = Collapse;

// hooks
import {
  useGetCurrentMonth,
  useGetCurrentYear,
  useGetDateDaysFirst,
  useGetDateMonthFirst,
  useIsSameMonth,
} from '@hooks/useDate';

// components
import HomeNavBar from '@components/HomeNavBar';

// constants
import { studentMenu } from '@constants/menu.js';

let course = {
  id: '12s21ksjh2j12k4',
  nombre: '1ro Básico',
  año: '2022',
};

let student = {
  id: '2k1928d9218',
  nombres: 'John',
  apellidos: 'Brown',
  tipo: 'estudiante',
  idCurso: '12s21ksjh2j12k4',
  asistencia: [
    { fecha: '2022-09-02', presente: true },
    { fecha: '2022-09-03', presente: true },
    { fecha: '2022-09-04', presente: true },
    { fecha: '2022-09-05', presente: true },
    { fecha: '2022-09-06', presente: false },
    { fecha: '2022-09-07', presente: true },
    { fecha: '2022-09-08', presente: true },
    { fecha: '2022-09-09', presente: false },
    { fecha: '2022-09-10', presente: false },
    { fecha: '2022-09-11', presente: true },
    { fecha: '2022-10-06', presente: false },
    { fecha: '2022-10-07', presente: true },
    { fecha: '2022-10-08', presente: true },
    { fecha: '2022-11-09', presente: false },
    { fecha: '2022-11-10', presente: false },
    { fecha: '2022-11-11', presente: true },
  ],
};

const Attendance = () => {
  const currentDate = useGetCurrentMonth() + '-' + useGetCurrentYear();
  const [userState, setUserState] = useState(student);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    // Cuando se elimina la fecha, la fecha por defecto queda en formato YYYY-MM
    if (selectedDate.split('-')[0].length == 4)
      console.log('la fecha fue borrada, no hacer busqueda aun');
  }, [selectedDate]);

  const onChange = (objDate, dateString) => {
    if (dateString != '') setSelectedDate(useGetDateMonthFirst(dateString));
  };

  return (
    <div className='content' style={{ margin: '60px 10px 50px 10px', width: '95%' }}>
      <div className='header-container'>
        <Title>Asistencia</Title>
        <Space direction='vertical'>
          <DatePicker
            defaultValue={moment(currentDate, 'MM-YYYY')}
            picker='month'
            onChange={onChange}
          />
        </Space>
      </div>
      <Title level={3}>
        {student.nombres} {student.apellidos}
      </Title>
      <table className='table'>
        <thead className='thead'>
          <tr className='trHead'>
            <th>Fecha</th>
            <th>Asiste</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {userState.asistencia.map((date) =>
            useIsSameMonth(selectedDate, date) ? (
              <tr className='trBody'>
                <td>{useGetDateDaysFirst(date.fecha)}</td>
                <td>{date.presente ? 'Si' : 'No'}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
