import React, { useState, useEffect } from "react";
import "@styles/Marks.less";

// antd
import { Checkbox, Collapse, Typography, Statistic, DatePicker, Button } from "antd";
import { CalendarOutlined, ReconciliationFilled } from "@ant-design/icons";
import moment from "moment";
const { Title } = Typography;
const { Panel } = Collapse;

// hooks
import { useAverage } from "@hooks/useAverage";

//containers
import { AdminTableLayout } from "@containers/index";

//components
import { ContentTable, DefaultTitleContent } from "@components/index";

// constants
import { family } from "@constants/familyMarks.js";
import { columns } from "@constants/marksTable";

const StudentsAverage = ({ students }) => {
  return students.map((student) => (
    <div>
      <Statistic
        title={student.nombres.split(" ")[0] + " " + student.apellidos[0]}
        value={"Promedio: " + useAverage(student.notas, 2)}
      />
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
            tableContent={<ContentTable content={student.notas} columns={columns} scroll={false} />}
          />
        </Panel>
      ))}
    </Collapse>
  );
};

const Marks = () => {
  const [familyState, setFamily] = useState(family);
  const { parents, students } = familyState;

  return (
    <div>
      <DefaultTitleContent title={"Notas"} action="" />
      <StudentsAverage students={familyState.students} />

      <div style={{ marginTop: 22 }}>
        <CollapsePanel studentArray={familyState.students} />
      </div>
    </div>
  );
};

export default Marks;
