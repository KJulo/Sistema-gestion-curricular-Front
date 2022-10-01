import React, { useState, useEffect } from 'react';
import '@styles/Attendance.less';

// antd
import { Checkbox, Collapse, Typography, Space, DatePicker, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Title } = Typography;
const { Panel } = Collapse;

// hooks
import {
  useGetCurrentMonth,
  useGetCurrentYear,
  useGetDateMonthFirst,
} from '@hooks/useDate';

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
import { columns } from "@constants/attendanceTable";

const student = {
  id: '2k1928d9218',
  nombres: 'John',
  apellidos: 'Brown',
  tipo: 'estudiante',
  idCurso: '12s21ksjh2j12k4',
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
  ],
};

const Attendance = () => {
  const currentDate = useGetCurrentMonth() + '-' + useGetCurrentYear();
  const [userState, setUserState] = useState(student);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Esto se hace porque el useState se actuliza por renderizado
  useEffect(() => {
    setSelectedDate(selectedDate);
  }, [currentDate])

  useEffect(() => {
    // Cuando se elimina la fecha, la fecha por defecto queda en formato YYYY-MM
    if (selectedDate.split('-')[0].length == 4)
      console.log('la fecha fue borrada, no hacer busqueda aun');
  }, [selectedDate]);

  const onChange = (objDate, dateString) => {
    if (dateString != '') setSelectedDate(useGetDateMonthFirst(dateString));
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Title>Asistencia</Title>
        <Space direction='vertical'>
          <DatePicker
            defaultValue={moment(currentDate, 'MM-YYYY')}
            picker='month'
            onChange={onChange}
          />
        </Space>
      </div>

      <div
        style={true ? {} : { pointerEvents: "none" }}
      >
        <AdminTableLayout
          searchInput={""}
          // selectFilter={<TeacherFilterCourse />}
          tableContent={
            <ContentTable
              content={userState.asistencia}
              columns={columns}
              type="course"
            />
          }
        />
      </div>
    </div>
  );
};

export default Attendance;
