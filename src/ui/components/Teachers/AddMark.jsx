import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tooltip } from "antd";

import { useDispatch } from "react-redux";
import { setActiveFilter } from "@slices/teachers";

//components
import { FilterSubject, DatePicker } from "@components";

// TODO Terminar formulario y sagas para crear la nota
const AddMark = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setIsModalVisible(false);
    // dispatch();
    // form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeDate = (_, dateString) => {
    const dateSplited = dateString.split("/");
    const date = dateSplited[2] + "-" + dateSplited[1] + "-" + dateSplited[0];
    dispatch(setActiveFilter({ selectedDate: date }));
  };

  return (
    <>
      <Button type="primary" size="large" icon={<PlusOutlined />} onClick={showModal}>
        Añadir Nota
      </Button>

      <Modal
        title="Agregar nota"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form form={form} onFinish={handleOk} layout={"vertical"}>
          <Form.Item
            label="Nombre de la evaluación"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del curso",
              },
            ]}>
            <Input />
          </Form.Item>
          <Input.Group compact>
            {/* <FilterSubject subjects={selectedCourseSubjects} />
            <DatePicker onChange={onChangeDate}/> */}
          </Input.Group>
        </Form>
      </Modal>
    </>
  );
};

export default AddMark;
