import React, { useState, useEffect } from 'react';
import '@styles/Marks.less';

// antd
import { Checkbox, Collapse, Typography, Statistic, DatePicker, Button } from 'antd';
import { CalendarOutlined, ReconciliationFilled } from '@ant-design/icons';
import moment from 'moment';
const { Title } = Typography;
const { Panel } = Collapse;

// hooks
import { useGetCurrentMonth, useGetCurrentYear, useGetCurrentDay } from '@hooks/useDate';
import { useAverage } from '@hooks/useAverage';

// constants
import { family } from '@constants/familyMarks.js';

const courses = [
  {
  id: '12s21ksjh2j12k4',
  nombre: '1ro Básico',
  año: '2022',
  },{
  id: 'd129j3d8129kjsdad',
  nombre: "2do Medio",
  año: '2022'
  }
];

const StudentsAverage = ({ students }) => {
  return (
    students.map((student) => (
      <div>
        <Statistic
        title={student.nombres.split(' ')[0] + ' ' + student.apellidos[0]}
        value={'Promedio: ' + useAverage(student.notas, 2)} />
      </div>
    )))
}

const getNames = (arrayPerson) => {
  {arrayPerson.map((person) => {
    return person.nombres + '' + person.apellidos + '\n';
  })}
}

const getMarksColumns = () => {
  return (
    <thead className='thead'>
      <tr className='trHead'>
        <th>Fecha</th>
        <th>Evaluación</th>
        <th>Nota</th>
        <th>Ponderacion</th>
      </tr>
    </thead>
  )
}

const getMarksRows = (student) => {
  return (
    <tbody className='tbody'>
      {student.notas.map((mark, index) => (
        <tr className='trBody' key={index}>
          <td>{mark.fecha}</td>
          <td>{mark.evaluacion}</td>
          <td>{mark.nota}</td>
          <td>{mark.ponderacion * 100}%</td>
        </tr>
      ))}
      <tr className='trBody'>
        <td>-</td>
        <td>-</td>
        <td>Promedio: {useAverage(student.notas, 2)}</td>
      </tr>
    </tbody>
  )
}

const Marks = () => {
  const currentDate = useGetCurrentDay() + '-' + useGetCurrentMonth() + '-' + useGetCurrentYear();
  const [familyState, setFamily] = useState(family);
  const { parents, students } = familyState;


  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Title>Notas</Title>
        <StudentsAverage students={students} />
      </div>

      <Title level={3}>
        {getNames(students)}
      </Title>

      <Collapse accordion>
        {familyState.students.map((student, index) => (
          <Panel header={student.nombres +" "+ student.apellidos} key={index}>
            <table className='table'>
              {getMarksColumns()}
              {getMarksRows(student)}
            </table>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Marks;
