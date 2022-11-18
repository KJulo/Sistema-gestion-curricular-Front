import React, { useEffect } from "react";

//components
import Notifications from "@components/Notifications";
import { DefaultTitleContent, LoadingSpinner } from "@components";

// antd
import { Col, Row, Typography } from "antd";
const { Title } = Typography;

// styles
import "@styles/Home.less";

// assets
import SchoolImg from "@logos/school-img.png";

// constants
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification, fetchCourse } from "@slices/students";

const Home = () => {
  const dispatch = useDispatch();
  const { student, notifications, course, isLoading } = useSelector((store) => store.student);

  useEffect(() => {
    dispatch(fetchCourse());
  }, []);
  useEffect(() => {
    if (student.id_curso) {
      dispatch(fetchNotification(student.id_curso));
    }
  }, [student]);

  return (
    <LoadingSpinner isLoading={isLoading}>
      <div style={{ minHeight: 280 }}>
        <DefaultTitleContent
          title={
            <Col>
              <Row>{"Hola, " + student.nombres + " " + student.apellidos}</Row>
              <Row>{course.nombre + " - " + course.paralelo}</Row>
            </Col>
          }
          subtitle="Aquí podrás ver tus tareas pendientes y tu izquierda, podrás seguir navegando por el sitio, ¡Buen día!"
        />

        <div
          className="flex-container"
          style={{ padding: 10, justifyContent: "space-around", flexDirection: "column" }}>
          <img src={SchoolImg} alt="Logo Colegio" style={{ margin: 10 }} />

          <Notifications data={notifications} />
        </div>
      </div>
    </LoadingSpinner>
  );
};

export default Home;
