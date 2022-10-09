import React, { useState, useEffect } from 'react';
import '@styles/Marks.less';

// antd
import { Statistic, Typography, Space, DatePicker, Button } from 'antd';
import { CalendarOutlined, ReconciliationFilled } from '@ant-design/icons';
const { Title } = Typography;

// hooks
import { useGetCurrentMonth, useGetCurrentYear, useGetCurrentDay } from '@hooks/useDate';
import { useAverage } from '@hooks/useAverage';

//components
import {
  ContentTable,
  SearchContent,
  TeacherFilterCourse,
  DefaultTitleContent,
} from '@components/index';

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { columns } from "@constants/marksTable";

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
      ponderacion: 0.3,
    },
    {
      fecha: '2022-09-03',
      asignatura: 'Matemáticas',
      evaluacion: 'Prueba 2 Matemáticas',
      nota: 6.5,
      ponderacion: 0.4,
    },
    {
      fecha: '2022-09-04',
      asignatura: 'Matemáticas',
      evaluacion: 'Prueba 3 Matemáticas',
      nota: 7,
      ponderacion: 0.3,
    },
    {
      fecha: '2022-09-06',
      asignatura: 'Lenguaje',
      evaluacion: 'Prueba 1 Lenguaje',
      nota: 5,
      ponderacion: 0.3,
    },
    {
      fecha: '2022-09-07',
      asignatura: 'Historia',
      evaluacion: 'Prueba 1 Historia',
      nota: 6,
      ponderacion: 0.3,
    },
    {
      fecha: '2022-09-08',
      asignatura: 'Historia',
      evaluacion: 'Prueba 2 Historia',
      nota: 5.5,
      ponderacion: 0.4,
    },
    {
      fecha: '2022-09-09',
      asignatura: 'Lenguaje',
      evaluacion: 'Prueba 2 Lenguaje',
      nota: 4,
      ponderacion: 0.4,
    },
    {
      fecha: '2022-09-10',
      asignatura: 'Lenguaje',
      evaluacion: 'Prueba 3 Lenguaje',
      nota: 3.5,
      ponderacion: 0.3,
    },
    {
      fecha: '2022-09-11',
      asignatura: 'Ingles',
      evaluacion: 'Prueba 1 Inglés',
      nota: 1.5,
      ponderacion: 0.3,
    },
    {
      fecha: '2022-10-07',
      asignatura: 'Ingles',
      evaluacion: 'Prueba 2 Inglés',
      nota: 7,
      ponderacion: 0.4,
    },
    {
      fecha: '2022-10-08',
      asignatura: 'Ingles',
      evaluacion: 'Prueba 3 Inglés',
      nota: 6.5,
      ponderacion: 0.3,
    },
    {
      fecha: '2022-11-09',
      asignatura: 'Ciencias',
      evaluacion: 'Prueba 1 Ciencias',
      nota: 4.5,
      ponderacion: 0.3,
    },
    {
      fecha: '2022-11-10',
      asignatura: 'Ciencias',
      evaluacion: 'Prueba 2 Ciencias',
      nota: 6,
      ponderacion: 0.7,
    },
    {
      fecha: '2022-11-11',
      asignatura: 'Ed. Física',
      evaluacion: 'Prueba 1 Ed. Física',
      nota: 5,
      ponderacion: 1,
    },
  ],
};

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

const Marks = () => {
  const currentDate = useGetCurrentDay() + '-' + useGetCurrentMonth() + '-' + useGetCurrentYear();
  const [userState, setUserState] = useState(student);

  useEffect(() => {
    console.log(userState);
  }, [])

  return (
    <div>
      <DefaultTitleContent title={"Notas"} action="" />
      <StudentsAverage students={[userState]} />
      
      <div
        style={true ? {} : { pointerEvents: "none" }}
      >
        <AdminTableLayout
          searchInput={""}
          // selectFilter={<TeacherFilterCourse />}
          tableContent={
            <ContentTable
              content={student.notas}
              columns={columns}
              type="scroll"
            />
          }
        />
      </div>
    </div>
  );
};

export default Marks;
