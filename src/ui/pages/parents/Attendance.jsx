import React, { useState, useEffect } from "react";
import "@styles/Attendance.less";

// antd
import { Collapse, Space, DatePicker } from "antd";
import moment from "moment";
const { Panel } = Collapse;

// hooks
import {
  useGetCurrentMonth,
  useGetCurrentYear,
  useGetDateDaysFirst,
  useGetDateMonthFirst,
  useIsSameMonth,
} from "@hooks/useDate";

import { fetchStudents } from "@slices/parents";

//containers
import { AdminTableLayout } from "@containers/index";

//components
import { ContentTable, DefaultTitleContent, LoadingSpinner } from "@components/index";

// constants
import { columns } from "@constants/student/attendanceTable";
import { useDispatch, useSelector } from "react-redux";

const CollapsePanel = ({ studentArray }) => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse onChange={onChange}>
      {studentArray.map((student, index) => (
        <Panel header={`${student.nombres} ${student.apellidos}`} key={index}>
          <AdminTableLayout
            searchInput={""}
            tableContent={
              <ContentTable content={student.asistencia} columns={columns} scroll={500} />
            }
          />
        </Panel>
      ))}
    </Collapse>
  );
};

const Attendance = () => {
  const currentDate = useGetCurrentMonth() + "-" + useGetCurrentYear();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const { parentData, students, isLoading } = useSelector((store) => store.parent);
  const dispatch = useDispatch();
  useEffect(() => {
    // Cada estudiante de por si ya incluye las notificaciones en la consulta
    //Tambien incluye el curso y las asignaturas
    if (parentData.id) {
      dispatch(fetchStudents(parentData.id));
    }
  }, [parentData]);

  useEffect(() => {
    // Cuando se elimina la fecha, la fecha por defecto queda en formato YYYY-MM
    if (selectedDate.split("-")[0].length == 4)
      console.log("la fecha fue borrada, no hacer busqueda aun");
  }, [selectedDate]);

  const onChange = (objDate, dateString) => {
    if (dateString != "") setSelectedDate(useGetDateMonthFirst(dateString));
  };

  return (
    <div>
      <DefaultTitleContent
        title={"Asistencia"}
        subtitle="Aqu?? podras revisar la asistencia con m??s detalle que llevan tus pupilos."
      />

      <LoadingSpinner isLoading={isLoading}>
        <div style={{ marginTop: 22, maxWidth: 600 }}>
          <CollapsePanel studentArray={students} />
        </div>
      </LoadingSpinner>
    </div>
  );
};

export default Attendance;
