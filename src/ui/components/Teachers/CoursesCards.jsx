import React, { useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addForums, fetchForumsAndContent } from "@slices/teachers";

// antd
import { Typography, Button, Modal, Row, Space, message } from "antd";
const { Title } = Typography;

// styles
import "@styles/Home.less";

// components
import { Card, Planification } from "@components";
import { useEffect } from "react";

const CoursesCards = ({ courses, management, isLoading }) => {
  const dispatch = useDispatch();
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  // Modal
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchForumsAndContent());
  }, []);

  const showModal = (course) => {
    setOpen(true);
    setSelectedCourse(course);
  };

  const handleOk = () => {
    const payload = {
      course: management.course,
      forums: management.units,
    };
    if (payload.forums.length === 0) {
      message.destroy();
      message.warning("Debe de por lo menos añadir una unidad.");
    } else {
      dispatch(addForums(payload));
    }
    // setModalText('The modal will be closed after two seconds');
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="card-container">
      <Row gutter={16}>
        {courses.map((course) => (
          <div onClick={() => showModal(course)}>
            <Card
              title={course.nombre + " - " + course.paralelo}
              content={course.año}
              icon={
                course.nombre.split(" ")[0] + " " + course.nombre.split(" ")[1][0] + course.paralelo
              }
            />
          </div>
        ))}
      </Row>

      <Modal
        title={
          <Title level={4}>
            Planificación {selectedCourse.nombre + " " + selectedCourse.paralelo}{" "}
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
          onClick={handleOk}
          type="primary"
          shape="round"
          disabled={!selectedCourse.asignaturas.length > 0}>
          Guardar Cambios
        </Button>
      </Modal>
    </div>
  );
};

export default CoursesCards;
