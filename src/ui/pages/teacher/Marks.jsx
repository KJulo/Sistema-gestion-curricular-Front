import React, { useState, useEffect } from 'react';
import '@styles/Marks.less';

// antd
import { Collapse, Typography, Button, Space, DatePicker } from 'antd';
import moment from 'moment';
const { Title } = Typography;
const { Panel } = Collapse;

// hooks
import { useGetCurrentDate } from '@hooks/useDate';
import { getAverage } from '@hooks/useMath';

// components
import HomeNavBar from '@components/HomeNavBar';

// constants
import { teacher } from '@constants/users';
import { teacherMenu } from '@constants/menu.js';

// Un profesor debería de poder seleccionar entre estos tipos de asignaturas al momento de añadir una nota
// Las asignaturas disponibles son dependientes del curso en el que está
let courses = [
  {
    id: '12s21ksjh2j12k4',
    nombre: '1ro Básico',
    asignaturas: ['Matemáticas', 'Lenguaje'],
    año: '2022',
  },
  {
    id: '12sf424f234fj12k4',
    nombre: '2ro Básico',
    asignaturas: ['Historia', 'Lenguaje'],
    año: '2022',
  },
  {
    id: '12sf234f23d4d12k4',
    nombre: '3ro Básico',
    asignaturas: ['Ciencias', 'Historia'],
    año: '2022',
  },
];

// Los alumnos deben aparecer con sus notas dependiendo del día
// en caso que se cambie la fecha donde no hay notas, habilitar campos en blanco
// caso que ya existan notas, habilitar edicion
let students = [
  {
    id: '2k1928d9218',
    nombres: 'John',
    apellidos: 'Brown',
    idCurso: '12s21ksjh2j12k4',
    notas: [
      {
        fecha: '2022-09-02',
        asignatura: 'Matemáticas',
        evaluacion: 'Prueba 1 Matemáticas',
        nota: 5.5,
        total: 0.6,
      },
      {
        fecha: '2022-09-03',
        asignatura: 'Matemáticas',
        evaluacion: 'Prueba 2 Matemáticas',
        nota: 6.5,
        total: 0.4,
      },
      {
        fecha: '2022-09-06',
        asignatura: 'Lenguaje',
        evaluacion: 'Prueba 1 Lenguaje',
        nota: 5,
        total: 1,
      },
    ],
  },
  {
    id: '2k1928d9218',
    nombres: 'Jose',
    apellidos: 'Lopez',
    idCurso: '12s21ksjh2j12k4',
    notas: [
      {
        fecha: '2022-09-02',
        asignatura: 'Historia',
        evaluacion: 'Prueba 1 Historia',
        nota: 7,
        total: 0.6,
      },
      {
        fecha: '2022-09-03',
        asignatura: 'Historia',
        evaluacion: 'Prueba 2 Historia',
        nota: 3.5,
        total: 0.4,
      },
      {
        fecha: '2022-09-06',
        asignatura: 'Matemáticas',
        evaluacion: 'Prueba 1 Matemáticas',
        nota: 6,
        total: 1,
      },
    ],
  },
  {
    id: '2k1928d9218',
    nombres: 'Juan',
    apellidos: 'Hernandez',
    idCurso: '12sf424f234fj12k4',
    notas: [
      {
        fecha: '2022-09-02',
        asignatura: 'Matemáticas',
        evaluacion: 'Prueba 1 Matemáticas',
        nota: 5.5,
        total: 0.6,
      },
      {
        fecha: '2022-09-03',
        asignatura: 'Matemáticas',
        evaluacion: 'Prueba 2 Matemáticas',
        nota: 6.5,
        total: 0.4,
      },
      {
        fecha: '2022-09-06',
        asignatura: 'Lenguaje',
        evaluacion: 'Prueba 1 Lenguaje',
        nota: 5,
        total: 1,
      },
    ],
  },
  {
    id: '2k1928d9218',
    nombres: 'Marcos',
    apellidos: 'Velasquez',
    idCurso: '12sf234f23d4d12k4',
    notas: [
      {
        fecha: '2022-09-02',
        asignatura: 'Matemáticas',
        evaluacion: 'Prueba 1 Matemáticas',
        nota: 5.5,
        total: 0.6,
      },
      {
        fecha: '2022-09-03',
        asignatura: 'Matemáticas',
        evaluacion: 'Prueba 2 Matemáticas',
        nota: 6.5,
        total: 0.4,
      },
      {
        fecha: '2022-09-06',
        asignatura: 'Ciencias',
        evaluacion: 'Prueba 1 Ciencias',
        nota: 5,
        total: 1,
      },
    ],
  },
];

const Marks = () => {
  const currentDate = useGetCurrentDate();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [userState, setUserState] = useState(students);

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const onChange = (objDate, dateString) => {
    setSelectedDate(dateString);
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const onClick = (course) => {
    const studentClass = userState.filter((student) => student.idCurso == course.id); // Datos finales a enviar a endpoint
    console.log('Salida: ', studentClass);
  };

  return (
    <div
      className='site-page-header-ghost-wrapper home-grid-layout all-height'
      style={{ margin: '0 40px 0 0', padding: 0 }}>
      <aside className='container-bg-mobile'>
        <HomeNavBar toppics={teacherMenu} user={teacher} className='NavBar' />
      </aside>

      <div className='content' style={{ margin: '60px 10px 50px 10px', width: '95%' }}>
        <div className='header-container'>
          <Title>Módulo Notas</Title>
          <Space direction='vertical'>
            <DatePicker
              defaultValue={moment(currentDate, 'DD/MM/YYYY')}
              format='DD/MM/YYYY'
              onChange={onChange}
            />
          </Space>
        </div>

        <Collapse>
          {/*Recorre los cursos */}
          {courses.map((course, index) => (
            <Panel header={course.nombre} key={index}>
              <table className='table'>
                <thead className='thead'>
                  <tr className='trHead'>
                    <th>Alumno</th>
                    <th>Fecha</th>
                    <th>Evaluación</th>
                    <th>Nota</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody className='tbody'>
                  {/* Recorre cada estudiante */}
                  {userState.map((student) =>
                    // Verifica que pertenezca al curso
                    student.idCurso == course.id
                      ? // Recorre sus notas
                        student.notas.map((mark, index) => (
                          <>
                            <tr className='trBody' key={index}>
                              <td>{student.nombres}</td>
                              <td>{mark.fecha}</td>
                              <td>{mark.evaluacion}</td>
                              <td>{mark.nota}</td>
                              <td>{mark.total * 100}%</td>
                            </tr>
                          </>
                        ))
                      : null
                  )}
                </tbody>
              </table>
              <Button type='primary' onClick={() => onClick(course)} style={{ marginTop: 10 }}>
                Guardar Cambios
              </Button>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default Marks;
