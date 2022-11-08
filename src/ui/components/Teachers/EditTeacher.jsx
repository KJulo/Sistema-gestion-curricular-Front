import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { UPDATE_TEACHER_ADMIN } from "@infrastructure/sagas/types/admin";

const EditTeacher = ({ teacher }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setIsModalVisible(false);
    dispatch({
      type: UPDATE_TEACHER_ADMIN,
      payload: { ...values, id: teacher.id },
    });
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
        title="Editar estudiante"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleOk} initialValues={teacher}>
          <Form.Item
            label="Nombre(s)"
            name="nombres"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el o los nombres del profesor",
              },
            ]}
          >
            <Input placeholder="Nombre Nombre" />
          </Form.Item>

          <Form.Item
            label="Apellido(s)"
            name="apellidos"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el o los apellidos del profesor",
              },
            ]}
          >
            <Input placeholder="Apellido Apellido"/>
          </Form.Item>

          <Form.Item
            label="Rut"
            name="rut"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el rut del profesor",
              },
              {
                pattern: /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/,
                message: "Rut invalido",
              },
            ]}
          >
            <Input placeholder="11.111.111-1" />
          </Form.Item>
          <Form.Item
            label="Correo"
            name="correo"
            rules={[{ required: true, message:"Por favor ingrese el correo del profesor" }]}
          >
            <Input placeholder="correo@correo.com"/>
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="contrasena"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la contraseña del profesor",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditTeacher;