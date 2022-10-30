import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_COURSE_ADMIN } from "@infrastructure/sagas/types/admin";

const AddSubject = ({ courseId }) => {
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
      type: UPDATE_COURSE_ADMIN,
      payload: {
        asignatura: {
          ...values,
          id_profesor:
            values.id_profesor !== "" ? values.id_profesor : undefined,
        },
        id: courseId,
      },
    });
    form.resetFields();
    message.success("Alumno agregado con exito.");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Agregar asignatura
      </Button>
      <Modal
        title="Agregar asignatura"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleOk}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre de la asignatura",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Id del profesor" name="id_profesor">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSubject;
