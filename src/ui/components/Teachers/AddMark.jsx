import React, { useEffect, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Typography,
  InputNumber,
  message,
  Tooltip,
} from "antd";
const { Title } = Typography;

import { useDispatch } from "react-redux";
import { setActiveFilter, addMarks } from "@slices/teachers";

//components
import { FilterSubject, DatePicker } from "@components";

// TODO Terminar formulario y sagas para crear la nota
const AddMark = ({ course, students, filters }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hasSubjects = course?.asignaturas.length > 0;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setIsModalVisible(false);
    console.log(values, filters);
    if (hasAllConditions(filters)) {
      const params = {
        markInformation: values,
        courseInformation: filters,
      };
      dispatch(addMarks(params));
    }
    form.resetFields();
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

  function hasAllConditions(filters) {
    const condition = filters && filters.courseId && filters.selectedDate && filters.subjectId;
    // Si no se cumple con algo
    if (!condition) {
      message.destroy();
      if (!filters.courseId) message.warning("Seleccione el curso a registrar.");
      if (!filters.selectedDate) message.warning("Seleccione una fecha para registrar.");
      if (!filters.subjectId) message.warning("Seleccione la asignatura a registrar.");
    } else {
      return true;
    }
  }

  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={showModal}
        disabled={students?.length === 0}>
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
                message: "Por favor ingrese el nombre de la evaluación",
              },
            ]}>
            <Input />
          </Form.Item>
          <Tooltip
            placement="bottom"
            title="Es el porcentaje al que equivale esta nota respecto al total de evaluaciones.">
            <Form.Item
              label="Ponderación (%)"
              name="ponderacion"
              defaultValue={100}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
              rules={[
                {
                  required: true,
                  message: "Ingrese un valor",
                },
              ]}>
              <InputNumber disabled={!hasSubjects} min={0} max={100} />
            </Form.Item>
          </Tooltip>
          <Space direction="horizontal">
            {hasSubjects ? (
              <Select
                placeholder="Seleccionar asignatura"
                size="large"
                onChange={onSubjectChange}
                defaultValue={course?.asignaturas[0].nombre}>
                {course?.asignaturas.map((a) => (
                  <Option value={a.id}>{a.nombre}</Option>
                ))}
              </Select>
            ) : (
              <Select placeholder="Sin asignaturas" size="large"></Select>
            )}
            <DatePicker onChange={onChangeDate} />
          </Space>

          <Title level={5} style={{ marginTop: 20 }}>
            {students?.length > 0 ? "Estudiantes" : "Sin estudiantes"}
          </Title>

          {students?.map((student) => (
            <Form.Item
              label={`${student.nombres} ${student.apellidos}`}
              name={student.rut}
              placeholder={"1.0"}
              maxLength={16}
              rules={[
                {
                  required: true,
                  message: "Ingrese un valor",
                },
              ]}>
              <InputNumber disabled={!hasSubjects} min={1} max={7} />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
};

export default AddMark;
