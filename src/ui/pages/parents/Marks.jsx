import React, { useState, useEffect } from "react";
import "@styles/Marks.less";

// antd
import { Collapse, Statistic, Divider } from "antd";
const { Panel } = Collapse;

import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "@slices/parents";

//containers
import { AdminTableLayout } from "@containers/index";

//components
import { ContentTable, DefaultTitleContent } from "@components/index";

// constants
import { columns } from "@constants/marksTable";
import { getAverage } from "@utils/maths";

const StudentsAverage = ({ students }) => {
  return students.map((student) => (
    <div>
      <Statistic
        title={`${student.nombres} ${student.apellidos}`}
        value={
          student.nota.length > 0
            ? `Promedio: ${getAverage(student.nota)}`
            : "Estudiante sin notas."
        }
      />
      <Divider />
    </div>
  ));
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
            tableContent={<ContentTable content={student.nota} columns={columns} scroll={false} />}
          />
        </Panel>
      ))}
    </Collapse>
  );
};

const Marks = () => {
  const dispatch = useDispatch();
  const { parentData, students } = useSelector((store) => store.parent);

  useEffect(() => {
    if (parentData.id) dispatch(fetchStudents(parentData.id));
  }, [parentData]);

  console.log(students);

  return (
    <div>
      <DefaultTitleContent
        title={"Notas"}
        subtitle="Aquí podrás revisar las notas con más detalle de tus pupilos."
      />
      <StudentsAverage students={students} />

      <div style={{ marginTop: 22 }}>
        <CollapsePanel studentArray={students} />
      </div>
    </div>
  );
};

export default Marks;
