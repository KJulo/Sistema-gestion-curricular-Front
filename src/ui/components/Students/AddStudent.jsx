import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ADD_STUDENT_ADMIN } from "@infrastructure/sagas/types/admin";

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
      type: ADD_STUDENT_ADMIN,
      payload: { ...values, id_colegio: admin.id_colegio },
    });
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Agregar Alumno
      </Button>
      <Modal
        title="Agregar alumno"
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
                message: "Por favor ingrese el o los nombres del alumno",
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
                message: "Por favor ingrese el o los apellidos del alumno",
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
                message: "Por favor ingrese el rut del alumno",
              },
              {
                pattern: /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/,
                message: "Rut invalido",
              },
            ]}
          >
            <Input placeholder="11.111.111-1"/>
          </Form.Item>
          <Form.Item
            label="Correo"
            name="correo"
            rules={[{ required: true, message:"Por favor ingrese el correo del alumno" }]}
          >
            <Input placeholder="correo@correo.com"/>
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="contrasena"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la contraseña del alumno",
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
