import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TEACHER_ADMIN } from "@infrastructure/sagas/types/admin";

const AddTeacher = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const { admin } = useSelector((store) => store.admin);

  const handleOk = (values) => {
    setIsModalVisible(false);
    
    dispatch({
      type: ADD_TEACHER_ADMIN,
      payload: { ...values, id_colegio: admin.id_colegio },
    });
    form.resetFields();
    message.success("Profesor creado con exito.")
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Agregar profesor
      </Button>
      <Modal
        title="Agregar profesor"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleOk}>
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
            <Input />
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
            <Input />
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
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Correo"
            name="correo"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
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

export default AddTeacher;
