import React, { useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addForums } from "@slices/teachers";

// antd
import { Typography, Button, Modal, Row, Space, message } from "antd";
const { Title, Text } = Typography;

// styles
import "@styles/Home.less";

// components
import { Card, Planification } from "@components";
import { useEffect } from "react";

const CoursesCards = ({ courses, management, isLoading }) => {
  const dispatch = useDispatch();
  const hasCourses = courses.length > 0;
  const [selectedCourse, setSelectedCourse] = useState(hasCourses ? courses[0] : []);
  // Modal
  const [open, setOpen] = useState(false);

  const showModal = (course) => {
    setOpen(true);
    setSelectedCourse(course);
  };

  const handleOk = () => {
    const payload = {
      course: management.course,
      forums: management.units,
      deleted: management.deleted,
    };
    if (payload.forums.length === 0) {
      message.destroy();
      message.warning("Debe de por lo menos añadir una unidad.");
    } else {
      dispatch(addForums(payload));
    }
  };

  const handleCancel = () => {
    setOpen(false);
    message.destroy();
    message.warning("Recuerde guardar sus cambios.");
  };

  const setTag = (course) => {
    const names = course.nombre.split(" ");
    if (names.length !== 1) {
      return `${names[0]} ${names[1][0]} - ${course.paralelo}`;
    }
    return `${course.nombre} - ${course.paralelo}`;
  }
  return hasCourses ? (
    <div className="card-container">
      <Row gutter={16}>
        {courses.map((course) => (
          <div onClick={() => showModal(course)}>
            <Card
              title={course.nombre + " - " + course.paralelo}
              content={course.año}
              icon={
                setTag(course)
              }
            />
          </div>
        ))}
      </Row>

      <Modal
        title={
          <Title level={4}>
            Planificación {selectedCourse?.nombre + " " + selectedCourse?.paralelo}{" "}
          </Title>
        }
        open={open}
        onOk={() => handleOk}
        confirmLoading={isLoading}
        onCancel={handleCancel}
        width={800}
        style={{ top: 20 }}
        footer={[]}>
        <Planification course={selectedCourse} management={management} />
        <br></br>
        <Button
          loading={isLoading}
          onClick={handleOk}
          type="primary"
          shape="round"
          disabled={!selectedCourse?.asignaturas?.length > 0}>
          Guardar Cambios
        </Button>
      </Modal>
    </div>
  ) : (
    <Text>Sin cursos que mostrar.</Text>
  );
};

export default CoursesCards;
