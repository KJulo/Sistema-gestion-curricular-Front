import React, { useState, useEffect } from "react";
import "@styles/Attendance.less";

// antd
import { Checkbox, Collapse, Typography, Space, DatePicker, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
const { Title } = Typography;
const { Panel } = Collapse;

// hooks
import { useGetCurrentMonth, useGetCurrentYear, useGetDateMonthFirst } from "@hooks/useDate";

//components
import { ContentTable, SearchContent, FilterCourse, DefaultTitleContent } from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//components
import { LoadingSpinner } from "@components";

//constants
import { columns } from "@constants/student/attendanceTable";
import { setIsLoading, fetchAttendance, updateFilters } from "@slices/students";
import { useDispatch, useSelector } from "react-redux";

const Attendance = () => {
  const currentDate = useGetCurrentMonth() + "-" + useGetCurrentYear();
  const dispatch = useDispatch();
  const { student, isLoading, attendance, filters } = useSelector((store) => store.student);
  const [attendanceFiltered, setAttendanceFiltered] = useState([]);

  // Recuperar data
  useEffect(() => {
    dispatch(fetchAttendance());
  }, [student]);

  // Se initializa la variable de estado al cambiar la data de la store
  useEffect(() => {
    updateAttendance(attendance, null);
  }, [attendance]);

  // Se ejecuta cuando se cambia la fecha
  const onChange = (objDate, dateString) => {
    if (dateString != "") dispatch(updateFilters({ fecha: useGetDateMonthFirst(dateString) }));
  };

  // Filtro por fecha
  useEffect(() => {
    if (filters.hasOwnProperty("fecha")) {
      const dateFilter = filters.fecha.split("-")[1] + "-" + filters.fecha.split("-")[0];
      updateAttendance(attendance, dateFilter);
    } else {
      updateAttendance(attendance, null);
    }
  }, [filters]);

  function updateAttendance(attendance, dateFilter) {
    if (!dateFilter) dateFilter = useGetDateMonthFirst(currentDate);
    setAttendanceFiltered(
      attendance.filter((a) => {
        const dateStore = a.fecha.split("-")[0] + "-" + a.fecha.split("-")[1];
        return dateStore === dateFilter;
      })
    );
  }

  return (
    <div>
      <div style={{ marginBottom: -20 }}>
        <DefaultTitleContent
          title={"Asistencia"}
          subtitle="Aquí podrás revisar la asistencia que llevas dependiendo del mes que elijas aquí abajo."
        />
        <Space direction="vertical">
          <DatePicker
            defaultValue={moment(currentDate, "MM-YYYY")}
            picker="month"
            onChange={onChange}
          />
        </Space>
      </div>

      <div style={true ? {} : { pointerEvents: "none" }}>
        <LoadingSpinner isLoading={isLoading}>
          <AdminTableLayout
            tableContent={
              <ContentTable content={attendanceFiltered} columns={columns} scroll={500} />
            }
          />
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default Attendance;
