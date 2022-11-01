import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UPDATE_SUBJECT_ADMIN } from "@infrastructure/sagas/types/admin";

const EditSubject = ({ asignatura }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setIsModalVisible(false);
    dispatch({
      type: UPDATE_SUBJECT_ADMIN,
      payload: {
        ...values,
        id_profesor: values.id_profesor !== "" ? values.id_profesor : null,
        id: asignatura.id,
        id_curso: asignatura.id_curso,
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <EditOutlined onClick={showModal} />
      <Modal
        title="Editar asignatura"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleOk} initialValues={asignatura}>
          <Form.Item
            label="Nombre de la asignatura"
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

export default EditSubject;
