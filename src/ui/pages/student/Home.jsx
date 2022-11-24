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

  console.log(course);

  return (
    <LoadingSpinner isLoading={isLoading}>
      <div style={{ minHeight: 280 }}>
        <DefaultTitleContent
          title={
            <Col>
              <Row>{"Hola, " + student.nombres + " " + student.apellidos}</Row>
              {course && JSON.stringify(course) !== "{}" ? (
                <Row>{course.nombre + " - " + course.paralelo}</Row>
              ) : course === undefined ? (
                <Title level={4} style={{ marginTop: 0 }}>
                  Sin curso asignado.
                </Title>
              ) : (
                <LoadingSpinner isLoading={true} size={"small"} />
              )}
            </Col>
          }
          subtitle="Aquí podrás ver tus tareas pendientes y tu izquierda, podrás seguir navegando por el sitio, ¡Buen día!"
        />

        <div className="flex-container" style={{ padding: 10, justifyContent: "space-evenly" }}>
          <img
            src={SchoolImg}
            alt="Logo Colegio"
            style={{ margin: 10, width: 500, height: "max-content" }}
          />

          <Notifications data={notifications} />
        </div>
      </div>
    </LoadingSpinner>
  );
};

export default Home;
