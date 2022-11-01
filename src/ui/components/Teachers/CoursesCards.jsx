import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// antd
import { Typography, Button, Modal, Row, Space } from 'antd';
const { Title } = Typography;

// styles
import '@styles/Home.less';

// components
import { Card, Planification } from '@components';

const CoursesCards = ({courses}) => {
  // Modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  // Course
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  const showModal = (course) => {
    setOpen(true);
    setSelectedCourse(course)
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className='card-container'>
      <Row gutter={16}>
        {courses.map((course) => (
          <div onClick={() => showModal(course)}>
            <Card
              title={course.nombre + ' - ' + course.paralelo}
              content={course.año}
              icon={course.nombre.split(' ')[0] + ' ' + course.nombre.split(' ')[1][0] + course.paralelo}
              />
          </div>
        ))}
      </Row>

      <Modal
        title={<Title level={4}>Planificación {selectedCourse.nombre} </Title>}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
        style={{ top: 20 }}
        footer={[]}
      >
        <Planification course={selectedCourse}/>
        <br></br>
        <Button onClick={handleOk}type="primary" shape="round">Guardar Cambios</Button>
      </Modal>
    </div>
  )
}

export default CoursesCards;