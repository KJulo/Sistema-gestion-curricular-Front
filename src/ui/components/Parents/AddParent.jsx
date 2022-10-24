import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PARENT_ADMIN } from "@infrastructure/sagas/types/admin";

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
      type: ADD_PARENT_ADMIN,
      payload: { ...values, id_colegio: admin.id_colegio },
    });
    form.resetFields();
    message.success("Apoderado agregado con exito.");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Agregar apoderado
      </Button>
      <Modal
        title="Agregar apoderado"
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
                message: "Por favor ingrese el o los nombres del apoderado",
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
                message: "Por favor ingrese el o los apellidos del apoderado",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Telefono"
            name="telefono"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el número telefonico del apoderado",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Telefono secundario" name="telefonoEmergencia">
            <Input />
          </Form.Item>

          <Form.Item label="Dirección" name="direccion">
            <Input />
          </Form.Item>

          <Form.Item
            label="Rut"
            name="rut"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el rut del apoderado",
              },
              {
                pattern: /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/,
                message: "Rut invalido",
              },
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
                message: "Por favor ingrese la contraseña del apoderado",
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
