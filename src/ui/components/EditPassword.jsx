import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EditOutlined } from "@ant-design/icons";

const EditPassword = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    console.log(values);
    setIsModalVisible(false);
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
        title="Editar contraseña"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleOk} initialValues={{}}>
          <Form.Item
            label="Contraseña actual"
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
            rules={[
              {
                required: true,
                message: " Por favor confirme la contraseña nueva",
              },
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
