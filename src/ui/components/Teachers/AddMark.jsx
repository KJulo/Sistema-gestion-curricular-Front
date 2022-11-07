import React, { useEffect, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space, Typography, InputNumber } from "antd";
const { Title } = Typography;

import { useDispatch } from "react-redux";
import { setActiveFilter } from "@slices/teachers";

//components
import { FilterSubject, DatePicker } from "@components";

// TODO Terminar formulario y sagas para crear la nota
const AddMark = ({ course, students }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [markState, setMarkState] = useState({}); // { rut: nota }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setIsModalVisible(false);
    console.log(values, markState);
    // TODO realizar verificacion "Aún quedan alumnos por ingresar ¿Desea continuar?" en el ok "Guardar con nota mínima."
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

  const onSubjectChange = (value) => {
    dispatch(setActiveFilter({ subjectId: value }));
  };

  const onMarkChange = (value, rut) => {
    let newMark = {};
    newMark[rut] = value.toString();
    setMarkState((prevState) => ({ ...prevState, ...newMark }));
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={showModal}
        disabled={students.length === 0}>
        Añadir Nota
      </Button>

      <Modal
        title={`Agregar nota a ${course?.nombre} - ${course?.paralelo}`}
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form form={form} onFinish={handleOk} layout={"vertical"} autoComplete="off">
          <Form.Item
            label="Nombre de la evaluación"
            name="nombre"
            placeholder="Evaluación"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del curso",
              },
            ]}>
            <Input />
          </Form.Item>
          <Space direction="horizontal">
            <Select
              placeholder="Seleccionar asignatura"
              size="large"
              onChange={(value) => onSubjectChange(value)}>
              {course?.asignaturas.map((a) => (
                <Option value={a.id}>{a.nombre}</Option>
              ))}
            </Select>
            <DatePicker onChange={onChangeDate} />
          </Space>

          <Title level={5} style={{ marginTop: 20 }}>
            {students.length > 0 ? "Estudiantes" : "Sin estudiantes"}
          </Title>

          {students.map((student) => (
            <Form.Item
              label={`${student.nombres} ${student.apellidos}`}
              name={student.rut}
              placeholder={"1.0"}
              maxLength={16}>
              <InputNumber min={1} max={7} onChange={(value) => onMarkChange(value, student.rut)} />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
};

export default AddMark;
