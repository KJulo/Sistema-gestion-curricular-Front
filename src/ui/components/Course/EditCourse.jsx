import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UPDATE_COURSE_ADMIN } from "@infrastructure/sagas/types/admin";

const EditCourse = ({ course }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setIsModalVisible(false);
    dispatch({
      type: UPDATE_COURSE_ADMIN,
      payload: { ...values, id: course.id },
    });
    message.success("Alumno editado con exito.");
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

   return (
    <>
      <Button onClick={showModal}>
        <EditOutlined /> Editar
      </Button>
      <Modal
        title="Agregar curso"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleOk} initialValues={course}>
          <Form.Item
            label="Nombre del curso"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del curso",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Paralelo"
            name="paralelo"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el paralelo del curso",
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Rut del profesor jefe"
            name="id_profesor"
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditCourse;
