import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "@slices/parents";

// antd
import { Col, Row } from "antd";

// assets
import SchoolImg from "@logos/school-img.png";

// styles
import "@styles/Home.less";

//components
import Notifications from "@components/Notifications";
import { StudentCards, DefaultTitleContent, LoadingSpinner } from "@components";

const Home = () => {
  const dispatch = useDispatch();
  const { parentData, students, isLoading } = useSelector((store) => store.parent);

  useEffect(() => {
    // Cada estudiante de por si ya incluye las notificaciones en la consulta
    // Tambien incluye el curso y las asignaturas
    if (parentData.id) {
      dispatch(fetchStudents(parentData.id));
    }
  }, [parentData]);
  return (
    <div
      className="body-bg"
      style={{
        margin: "24px 16px",
        minHeight: 280,
      }}>
      <DefaultTitleContent
        title={`Hola, ${parentData.nombres} ${parentData.apellidos} !`}
        subtitle="¡Haz click en uno de tus pupilos para desplegar información resumida de ellos!"
      />

      <LoadingSpinner isLoading={isLoading}>
        <div className="flex-container" style={{ padding: "1rem", justifyContent: "space-around" }}>
          <div style={{ display: "contents" }}>
            <img src={SchoolImg} alt="Logo Colegio" className="fit-image" />
            <Row className="card-container">
              {students.map((student) => (
                <Col>
                  <StudentCards student={student} />
                  <Notifications data={student.curso.notificacion} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </LoadingSpinner>
    </div>
  );
};

export default Home;
