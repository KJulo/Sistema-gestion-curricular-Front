import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { randomId } from '@utils/randomId';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Collapse, Empty, Radio } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;
import "@styles/Forms.less";

// Redux-Saga
import { updateCourseManagement, appendUnitsManagement } from '@slices/teachers';

import { DocumentGenerator, UnitHeader, UnitBody } from "@components"

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
  const [ selectedSubject, setSelectedSubject ] = useState(course.asignaturas[0]?.nombre)
  const { units } = useSelector(store => store.teacher.courses.management);
  const { teacher } = useSelector(store => store.teacher);
  const dispatch = useDispatch();

  useEffect(() => {
    // falta el sagas
    dispatch(updateCourseManagement({...course, asignatura: selectedSubject}));
  }, [])

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  const onSubjectChange = (value) => {
    setSelectedSubject(value.subject);
    dispatch(updateCourseManagement({...course, asignatura: value.subject}));
  }

  const addUnit = (unit) => {
    dispatch(appendUnitsManagement(unit))
  }

  return (
    <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{ display: 'grid' }}
      onValuesChange={onSubjectChange}
    >
      <Form.Item label="Cambiar Asignatura: " name="subject">
        <Radio.Group value={selectedSubject}>
          {course.asignaturas.map((subject) => (
            <Radio.Button value={subject.nombre}>{subject.nombre}</Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Typography>
        <Paragraph>
          <Title level={4}>Información del curso</Title>
          <blockquote>
            Asignatura: {selectedSubject} <br></br>
            Curso: {course.nombre} <br></br>
            Paralelo: {course.paralelo} <br></br>
            Profesor: {teacher.nombres + ' ' + teacher.apellidos} <br></br>
            Año: {course.anho} <br></br>
          </blockquote>
        </Paragraph>
      </Typography>

      <Title level={4}>Unidades del curso</Title>

        { units == 0
          ? <Empty />
          : <Collapse>
              {units.map((unit) => (
                <>
                  <Panel
                    header={<UnitHeader unit={unit} />}
                    width={1000}
                  >
                    <UnitBody unit={unit}/>
                  </Panel>
                </>
              ))}
            </Collapse>
        }
        <br></br>
        <Button type="dashed" block icon={<PlusOutlined />}
          onClick={() => addUnit({
            id: randomId(),
            nombre: 'Nueva Unidad',
            descripcion: '',
            objetivos: []
          })}
        >
          Añadir unidad
        </Button>

        <br></br>

        <DocumentGenerator data={{
          course: {
            ...course,
            asignatura: selectedSubject
          },
          units: units,
          teacher: teacher
        }} />
    </Form>
  );
}

export default Planification;