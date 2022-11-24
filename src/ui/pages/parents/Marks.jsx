import React, { useState, useEffect } from "react";
import "@styles/Marks.less";

// antd
import { Collapse, Statistic, Divider, Row, Col } from "antd";
const { Panel } = Collapse;

import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "@slices/parents";
7;

//hooks
import { useAverage, useAverageBySubject } from "@hooks/useAverage";

//containers
import { AdminTableLayout } from "@containers/index";

//components
import { ContentTable, DefaultTitleContent, LoadingSpinner } from "@components/index";

// constants
import { columns } from "@constants/marksTable";
import { getAverage } from "@utils/maths";

const StudentsAverage = ({ students }) => {
  students = students.map((s) => {
    return {
      ...s,
      nota: s.nota.map((n) => {
        return { ...n, asignatura: n.asignatura.nombre };
      }),
    };
  });

  return students.map((student) => {
    // Obtener nombres de las asignaturas
    const testNames = new Set();
    student.nota?.map((mark) => testNames.add(mark.asignatura));

    return (
      <div>
        <Statistic
          title={`${student.nombres} ${student.apellidos} - ${student.curso.nombre} ${student.curso.paralelo}`}
          value={
            student.nota.length > 0
              ? `Promedio: ${getAverage(student.nota)}`
              : "Estudiante sin notas."
          }
        />
        <Row gutter={16} style={{ marginTop: 10 }}>
          {Array.from(testNames).length > 0 ? (
            Array.from(testNames).map((test) => (
              <Col>
                <Statistic
                  title={test}
                  value={useAverageBySubject(student.nota, test, 2)}
                  style={{ width: "fit-content", margin: 0 }}
                />
              </Col>
            ))
          ) : (
            <></>
          )}
        </Row>
        <Divider />
      </div>
    );
  });
};

const CollapsePanel = ({ studentArray }) => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Collapse onChange={onChange}>
      {studentArray.map((student, index) => (
        <Panel header={student.nombres + " " + student.apellidos} key={index}>
          <AdminTableLayout
            searchInput={""}
            tableContent={<ContentTable content={student.nota} columns={columns} scroll={700} />}
          />
        </Panel>
      ))}
    </Collapse>
  );
};

const Marks = () => {
  const dispatch = useDispatch();
  const { parentData, students, isLoading } = useSelector((store) => store.parent);

  useEffect(() => {
    if (parentData.id) dispatch(fetchStudents(parentData.id));
  }, [parentData]);

  return (
    <div>
      <DefaultTitleContent
        title={"Notas"}
        subtitle="Aquí podrás revisar las notas con más detalle de tus pupilos."
      />
      <LoadingSpinner isLoading={isLoading}>
        <StudentsAverage students={students} />

        <div style={{ marginTop: 22 }}>
          <CollapsePanel studentArray={students} />
        </div>
      </LoadingSpinner>
    </div>
  );
};

export default Marks;
