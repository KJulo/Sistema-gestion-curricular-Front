import React, { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "@slices/parents";

// antd
import { Layout, Typography } from "antd";
const { Title } = Typography;

// assets
import SchoolImg from "@logos/school-img.png";

// styles
import "@styles/Home.less";

//components
import Notifications from "@components/Notifications";
import { StudentsCards } from "@components";

// TODO notifications
const Home = () => {
  const dispatch = useDispatch();
  const { parentData, students, notification, isLoading } = useSelector((store) => store.parent);

  // Seleccionar un padre cualquiera
  useEffect(() => {
    dispatch(fetchStudents());
  }, [parentData]);

  return (
    <div
      className="body-bg"
      style={{
        margin: "24px 16px",
        minHeight: 280,
      }}>
      <Title>
        {" "}
        Hola, {parentData.nombres} {parentData.apellidos} !
      </Title>

      <div className="flex-container" style={{ padding: "1rem", justifyContent: "space-around" }}>
        <div style={{ display: "contents" }}>
          <img src={SchoolImg} alt="Logo Colegio" className="fit-image" />
          <StudentsCards students={students} />
        </div>
        <Notifications />
      </div>
    </div>
  );
};

export default Home;
