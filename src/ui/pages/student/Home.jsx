import React, { useEffect } from "react";

//components
import Notifications from "@components/Notifications";
import { DefaultTitleContent } from "@components";

// antd
import { Typography } from "antd";
const { Title } = Typography;

// styles
import "@styles/Home.less";

// assets
import SchoolImg from "@logos/school-img.png";

// constants
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification } from "@slices/students";

const Home = () => {
  const dispatch = useDispatch();
  const { student, notifications } = useSelector((store) => store.student);

  useEffect(() => {
    if (student.id_curso) {
      dispatch(fetchNotification(student.id_curso));
    }
  }, [student]);

  return (
    <div style={{ minHeight: 280}}>
      <DefaultTitleContent
        title={"Hola, " + student.nombres + " " + student.apellidos}
        subtitle="Aquí podrás ver tus tareas pendientes y tu izquierda, podrás seguir navegando por el sitio, ¡Buen día!"
      />

      <div
        className="flex-container"
        style={{ padding: 10, justifyContent: "space-around",flexDirection:"column" }}
      >
        <img src={SchoolImg} alt="Logo Colegio" style={{ margin: 10 }} />

        <Notifications data={notifications} />
      </div>
    </div>
  );
};

export default Home;
