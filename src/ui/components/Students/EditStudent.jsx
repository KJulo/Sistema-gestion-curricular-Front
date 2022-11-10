import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UPDATE_STUDENT_ADMIN } from "@infrastructure/sagas/types/admin";

const EditStudent = ({ student }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setIsModalVisible(false);
    dispatch({
      type: UPDATE_STUDENT_ADMIN,
      payload: { ...values, id: student.id },
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
        title="Editar alumno"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleOk} initialValues={student}>
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
            <Input placeholder="Nombre Nombre"/>
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
            rules={[{ required: true, message:"Por favor ingrese el correo del alumno"}]}
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

export default EditStudent;
