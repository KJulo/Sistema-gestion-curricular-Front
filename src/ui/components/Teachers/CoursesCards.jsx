import React, { useState } from 'react';

// antd
import { Typography, Button, Modal } from 'antd';
const { Title } = Typography;

// styles
import '@styles/Home.less';

// components
import { Card } from '@components';
import DocumentGenerator from './DocumentGenerator';

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
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <div className='card-container'>
      {courses.map((course) => (
        <div onClick={() => showModal(course)}>
          <Card
            title={course.nombre}
            content={course.año}
            icon={course.nombre.split(' ')[0] + ' ' + course.nombre.split(' ')[1][0]}
            />
        </div>
      ))}

      <Modal
        title={"Planificación " + selectedCourse.nombre}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <DocumentGenerator />
      </Modal>
    </div>
  )
}

export default CoursesCards;