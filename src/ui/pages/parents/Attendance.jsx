import React, { useState, useEffect } from 'react';
import '@styles/Attendance.less';

// antd
import { Collapse, Typography, Space, DatePicker } from 'antd';
import { CalendarOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import moment from 'moment';
const { Title } = Typography;
const { Panel } = Collapse;

// hooks
import {
  useGetCurrentMonth,
  useGetCurrentYear,
  useGetDateDaysFirst,
  useGetDateMonthFirst,
  useIsSameMonth
} from '@hooks/useDate';

const family = {
  idFamily: "2fj2fj98j3gjf",
  parents: [
    { id: "2910fj218jf2", tipo: "apoderado", nombres: "Emma", apellidos: "Tapia" },
    { id: "j3fj9238j4gj9823", tipo: "apoderado",nombres: "Juan", apellidos: "Rojas" }
  ],
  students: [
    {
      id: "12412c1923m1928dj20d29",
      id_colegio: "29183080jf102k9dk",
      tipo: 'estudiante',
      nombres: "Marcelo Jose",
      apellidos: "Rojas Tapia",
      rut: "20539858-5",
      curso: "2do Medio",
      asistencia: [
        { fecha: '2022-09-02', presente: true },
        { fecha: '2022-09-03', presente: true },
        { fecha: '2022-09-04', presente: true },
        { fecha: '2022-09-05', presente: true },
        { fecha: '2022-09-06', presente: false },
        { fecha: '2022-09-07', presente: true },
        { fecha: '2022-09-08', presente: true },
        { fecha: '2022-10-01', presente: false },
        { fecha: '2022-10-02', presente: false },
        { fecha: '2022-10-03', presente: true },
        { fecha: '2022-10-04', presente: false },
        { fecha: '2022-10-05', presente: true },
        { fecha: '2022-10-06', presente: true },
        { fecha: '2022-11-09', presente: false },
        { fecha: '2022-11-10', presente: false },
        { fecha: '2022-11-11', presente: true },
      ]
    },{
      id: "1892381293812",
      id_colegio: "29183080jf102k9dk",
      tipo: 'estudiante',
      nombres: "Gonza Matias",
      apellidos: "Donoso Días",
		  rut: "19249858-5",
      curso: "1ro Básico",
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
      ]
    }
  ]
}

const getAsistanceRow = (student, selectedDate) => {
  let attendance = student.asistencia.map((date) =>
    useIsSameMonth(selectedDate, date) ? (
      <tr className='trBody'>
        <td>{useGetDateDaysFirst(date.fecha)}</td>
        <td>
          {date.presente ? (
            <>
              'Si' <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginLeft: 8 }}/>
            </>
          ) : (
            <>
              'No' <CloseCircleTwoTone twoToneColor="#eb2f96"/>
            </>
          )}
        </td>
      </tr>
    ) : null
  );

  
  if (attendance.find(date => date != null) == null ) {
    return (
      <tr className='trBody'>
        <td>No hay assistencia registrada en este mes</td>
        <td>-</td>
      </tr>
    )
  }

  return attendance;
}

const Attendance = () => {
  const currentDate = useGetCurrentMonth() + '-' + useGetCurrentYear();
  const [familyState, setFamilyState] = useState(null);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    setFamilyState(family)
  }, [])

  useEffect(() => {
    // Cuando se elimina la fecha, la fecha por defecto queda en formato YYYY-MM
    if (selectedDate.split('-')[0].length == 4)
      console.log('la fecha fue borrada, no hacer busqueda aun');
  }, [selectedDate]);

  const onChange = (objDate, dateString) => {
    if (dateString != '') setSelectedDate(useGetDateMonthFirst(dateString));
  };

  return familyState ? (
    <div>
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
      <Collapse accordion>
        {familyState.students.map((student, index) => (
          <Panel header={student.nombres +" "+ student.apellidos} key={index}>
            <table className='table'>
              <thead className='thead'>
                <tr className='trHead'>
                  <th>{selectedDate}</th>
                  <th>Asiste</th>
                </tr>
              </thead>
              <tbody className='tbody'>
                {getAsistanceRow(student, selectedDate)}
              </tbody>
            </table>
          </Panel>
        ))}
      </Collapse>
    </div>
  ) : null;
};

export default Attendance;
