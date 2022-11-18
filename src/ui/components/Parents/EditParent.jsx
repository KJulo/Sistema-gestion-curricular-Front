import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UPDATE_PARENT_ADMIN } from "@infrastructure/sagas/types/admin";

const EditParent = ({ parent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setIsModalVisible(false);
    dispatch({
      type: UPDATE_PARENT_ADMIN,
      payload: { ...values, id: parent.id },
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
        title="Editar apoderado"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleOk} initialValues={parent}>
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

          <Form.Item
            label="Dirección"
            name="direccion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la dirección del apoderado",
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
            rules={[
              {
                required: true,
                message: "Por favor ingrese el correo del apoderado",
              },
            ]}
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

export default EditParent;
