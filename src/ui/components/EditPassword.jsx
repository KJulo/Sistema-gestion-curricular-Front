import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { usuario } from "@infrastructure/network";

const EditPassword = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    console.log(values);
    try {
      const response = await usuario.changePassword({
        ...values,
        id: user.id,
        type: user.type,
      });
      console.log(response.data);
      message.success(response.data.data);
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      if (error.response.data.error.error) {
        message.error(error.response.data.error.error);
      } else {
        message.error("Debido a un error no se pudo cambiar la contraseña");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button onClick={showModal}>
        <EditOutlined /> Editar contraseña
      </Button>
      <Modal
        title="Editar contraseña"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleOk}>
          <Form.Item
            label="Contraseña actual"
            name="password"
            rules={[
              {
                required: true,
                message: " Por favor ingrese la contraseña actual",
              },
            ]}
          >
            <Input type="password" placeholder="Contraseña actual" />
          </Form.Item>
          <Form.Item
            label="Nueva contraseña"
            name="newPassword"
            rules={[
              {
                required: true,
                message: " Por favor ingrese la contraseña nueva",
              },
            ]}
          >
            <Input type="password" placeholder="Nueva contraseña" />
          </Form.Item>
          <Form.Item
            label="Confirmar nueva contraseña"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: " Por favor confirme la contraseña nueva",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las contraseñas no coinciden")
                  );
                },
              }),
            ]}
          >
            <Input type="password" placeholder="Confirmar nueva contraseña" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditPassword;
