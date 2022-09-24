import React, {useState, useEffect} from 'react';
import '@styles/Marks.less';

// antd
import {Collapse, Typography, Button, Space} from 'antd';
import {CalendarOutlined} from '@ant-design/icons';
const {Title} = Typography;
const {Panel} = Collapse;

// hooks
import {useGetCurrentDate} from '@hooks/useDate';
import {useAverage} from '@hooks/useAverage';

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

// IMPORTANTE : el students.notas[].evaluacion deben ser los mismos por cursos
// esto porque si un profe hace una prueba, la prueba debe aparecer para todos los alumnos del curso
// no tiene sentido que un alumno tenga una prueba más o una prueba menos, así que evitar eso
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
    id: '2k14124214v218',
    nombres: 'Jose',
    apellidos: 'Lopez',
    idCurso: '12s21ksjh2j12k4',
    notas: [
      {
        fecha: '2022-09-02',
        asignatura: 'Matemáticas',
        evaluacion: 'Prueba 1 Matemáticas',
        nota: 7,
        total: 0.6,
      },
      {
        fecha: '2022-09-03',
        asignatura: 'Matemáticas',
        evaluacion: 'Prueba 2 Matemáticas',
        nota: 3.5,
        total: 0.4,
      },
      {
        fecha: '2022-09-06',
        asignatura: 'Lenguaje',
        evaluacion: 'Prueba 1 Lenguaje',
        nota: 6,
        total: 1,
      },
    ],
  },
  {
    id: '2k142f14f12218',
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
        asignatura: 'Historia',
        evaluacion: 'Prueba 1 Historia',
        nota: 6.5,
        total: 0.4,
      },
      {
        fecha: '2022-09-06',
        asignatura: 'Ed. Física',
        evaluacion: 'Prueba 1 Ed. Física',
        nota: 5,
        total: 1,
      },
    ],
  },
  {
    id: '2k15f3g23218',
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

  // Esta funcion obtiene un arreglo de alumnos del curso introducido
  function getStudentsByCourse(course) {
    let studentList = [];
    userState.map((student) => {
      if (course.id == student.idCurso) {
        studentList.push(student);
      }
    });
    return studentList;
  }

  // Esta funcion obtiene desde una lista de alumnos, sus evaluaciones y devuelve un arreglo con valores unicos
  function getMarkList(studentsArray) {
    let subjectsList = [];
    studentsArray.map((student) =>
      student.notas.map((mark) => {
        subjectsList.push(mark.evaluacion);
      })
    );
    return [...new Set(subjectsList)];
  }

  // Esta funcion combina las demás, devolviendo las asignaturas en columnas
  function getSubjectskByCourseColumns(course) {
    const subjectList = getMarkList(getStudentsByCourse(course));
    return subjectList.map((subject) => <th>{subject}</th>);
  }

  // Esta funcion devuelve en varias filas los estudiantes y sus datos
  function getStudentsRow(course) {
    if (userState.length > 0) {
      // Recorre cada estudiante para generar filas
      return userState.map((student, key) => {
        if (student.idCurso == course.id) {
          return (
            <tr className='trBody'>
              <td>
                {student.nombres} {student.apellidos}
              </td>
              {student.notas.map((mark) => (
                <td>{mark.nota}</td>
              ))}
            </tr>
          );
        }
      });
    } else {
      return (
        <>
          <td>Sin datos</td>
        </>
      );
    }
  }

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const onChange = (objDate, dateString) => {
    setSelectedDate(dateString);
  };

  const onClick = (course) => {
    const studentClass = userState.filter((student) => student.idCurso == course.id); // Datos finales a enviar a endpoint
    console.log('Salida: ', studentClass);
  };

  return (
    <div>
      <div className='header-container'>
        <Title>Módulo Notas</Title>
        <Space direction='vertical'>
          <div className='date-container'>
            <Title level={5} style={{marginBottom: 5}}>
              {currentDate}
            </Title>
            <CalendarOutlined twoToneColor='#bfbfbf' style={{fontSize: 'large'}} />
          </div>
        </Space>
      </div>

      <Collapse accordion>
        {courses.map((course, index) => (
          <Panel header={course.nombre} key={index}>
            <table className='table'>
              <thead className='thead'>
                <tr className='trHead'>
                  <th>Nombre Alumno</th>
                  {getSubjectskByCourseColumns(course)}
                </tr>
              </thead>
              <tbody className='tbody'>{getStudentsRow(course)}</tbody>
            </table>
            <Button type='primary' onClick={() => onClick(course)} style={{marginTop: 10}}>
              Guardar Cambios
            </Button>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Marks;
