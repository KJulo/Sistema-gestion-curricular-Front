import React, { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  fetchCourses,
  fetchStudentsNotes,
  fetchAttendance,
  fetchNotification,
} from "@slices/parents";

// antd
import { Col, Layout, Row, Typography } from "antd";
const { Title } = Typography;

// assets
import SchoolImg from "@logos/school-img.png";

// styles
import "@styles/Home.less";

//components
import Notifications from "@components/Notifications";
import { StudentCards, DefaultTitleContent } from "@components";

const Home = () => {
  const dispatch = useDispatch();
  const { parentData, students, notification, isLoading } = useSelector(
    (store) => store.parent
  );

  useEffect(() => {
    // Cada estudiante de por si ya incluye las notificaciones en la consulta
    //Tambien incluye el curso y las asignaturas   
    dispatch(fetchStudents());
  }, [parentData]);

  // useEffect(() => {
  //   dispatch(fetchCourses());
  //   dispatch(fetchStudentsNotes());
  //   dispatch(fetchAttendance());
  // }, [students.length]);

  return (
    <div
      className="body-bg"
      style={{
        margin: "24px 16px",
        minHeight: 280,
      }}
    >
      <DefaultTitleContent
        title={`Hola, ${parent.nombres} ${parent.apellidos} !`}
        subtitle="¡Haz click en uno de tus pupilos para desplegar información resumida de ellos!"
      />

      <div
        className="flex-container"
        style={{ padding: "1rem", justifyContent: "space-around" }}
      >
        <div style={{ display: "contents" }}>
          <img src={SchoolImg} alt="Logo Colegio" className="fit-image" />
          <Row className="card-container" >
            {students.map((student) => (
              <Col>
                {console.log(student)}
                <StudentCards student={student} />
                <Notifications data={student.curso.notificacion} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
