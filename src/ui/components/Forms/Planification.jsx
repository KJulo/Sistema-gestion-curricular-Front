import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { randomId } from '@utils/randomId';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Collapse, Empty } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;
import "@styles/Forms.less";

// Redux-Saga
import { updateCourseManagement, appendUnitsManagement } from '@slices/teachers';

import { DocumentGenerator, PlanificationPanelHeader } from "@components"

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 20}
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {span: 24, offset: 0},
    sm: {span: 20, offset: 4},
  },
};

export const Planification = ({course}) => {
  const dispatch = useDispatch();
  const { units } = useSelector(store => store.teacher.courses.management);

  useEffect(() => {
    // falta el sagas
    dispatch(updateCourseManagement(course));
  })

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  const addUnit = (unit) => {
    dispatch(appendUnitsManagement(unit))
  }

  return (
    <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{ display: 'grid' }}
    >
      <Typography>
        <Paragraph>
          <Title level={4}>Información del curso</Title>
          <blockquote>
            Asignatura: {course.subject} <br></br>
            Curso: {course.course} <br></br>
            Profesor: {course.teacher} <br></br>
            Año: {course.date} <br></br>
          </blockquote>
        </Paragraph>
      </Typography>

      <Title level={4}>Unidades del curso</Title>

        { units == 0
          ? <Empty />
          : <Collapse>
              {units.map((unit, index) => (
                <>
                  <Panel
                    header={<PlanificationPanelHeader unit={unit} />}
                    width={1000}
                  >
                    {unit.objetivos}
                  </Panel>
                </>
              ))}
            </Collapse>
        }
        <br></br>
        <Button type="dashed" block icon={<PlusOutlined />}
          onClick={() => addUnit({ id: randomId(), nombre: 'Nueva Unidad', objetivos: ['objetivo1', 'objetivo2'] })}
        >
          Añadir unidad
        </Button>
        <br></br>
        <DocumentGenerator />

    </Form>
  );
}

export default Planification;