import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { updateStudentAttendance } from '@slices/teachers';

// antd
import { SwapOutlined } from "@ant-design/icons";

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
import { columns } from "@constants/teacher/marksTable";

const getMarkTest = (allMarks, test) => {
  return allMarks.notas.map((marks) => marks.evaluacion === test ? marks.nota : null ) // devuelve un arreglo con muchos null y una nota
  .find(nota => nota !== null ) // devuelve solo la nota
}

const Marks = () => {
  const dispatch = useDispatch();
  const content = useSelector((store) => store.teacher.students.marks);
  
  // Al hacer click en el icono de switch, cambiar estado de asiste
  const handleClick = (record) => {
    console.log(record);
  }

  // Obtener nombres de los test para las columnas
  const testNames = new Set();
  content.map((student) =>
    student.notas.map((test) =>
      testNames.add(test.evaluacion)
  ));

  // Columnas adicionales por cada prueba del curso
  const testColums = Array.from(testNames).map((test) => ({
    title: test,
    key: test.toLowerCase(),
    render: (record) => {
      return (
        <div
        style={getMarkTest(record, test) >= 4 ? { color: 'blue' } : { color: 'red' } }
        onClick={() => {
          handleClick(record)
        }}
        >
          { getMarkTest(record, test) }
        </div>
      );
    },
  }))
  
  return (
    <div>
      <DefaultTitleContent title={"Módulo Notas"} action="" />
      <div
        style={true ? {} : { pointerEvents: "none" }}
      >
        <AdminTableLayout
          searchInput={""}
          selectFilter={<TeacherFilterCourse />}
          tableContent={
            <ContentTable
              content={content}
              columns={columns.concat(testColums)}
              type="scroll"
            />
          }
        />
      </div>
    </div>
  );
};

export default Marks;