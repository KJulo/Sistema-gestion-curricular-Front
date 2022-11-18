import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { randomId } from "@utils/randomId";
import moment from "moment";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, Collapse, Empty, Radio } from "antd";
const { Title, Paragraph, Text, Link } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;
import "@styles/Forms.less";

// Redux-Saga
import {
  updateCourseManagement,
  appendUnitsManagement,
  cleanUnitsManagement,
  updateDateManagement,
} from "@slices/teachers";

import { DocumentGenerator, UnitHeader, UnitBody } from "@components";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export const Planification = ({ course, management }) => {
  const { teacher } = useSelector((store) => store.teacher);
  const {
    units,
    course: { asignaturas },
  } = management;
  const [selectedSubject, setSelectedSubject] = useState(course.asignaturas[0]?.nombre);
  const hasSubjects = asignaturas?.length > 0;
  const dispatch = useDispatch();
  const dateFormat = "YYYY/MM/DD";
  const todayDate = moment(new Date()).format(dateFormat);

  useEffect(() => {
    setSelectedSubject(course.asignaturas[0]?.nombre);
  }, [course]);

  useEffect(() => {
    // update management course
    dispatch(updateCourseManagement({ ...course, asignatura: selectedSubject }));
    // update management units
    const subject = course.asignaturas.find((c) => c.nombre === selectedSubject);
    if (subject?.foros?.length !== 0) {
      dispatch(cleanUnitsManagement());
      subject?.foros?.map((f) => {
        const titulo = f.titulo;
        let objetivos = f.objetivos ?? [];
        if (objetivos.length > 0) {
          let cont = 0;
          objetivos = objetivos.map((obj) => {
            // validar propiedades
            if (
              obj.descripcion !== "" &&
              (typeof obj.descripcion === "string" || !obj.descripcion.hasOwnProperty("id"))
            ) {
              cont = cont + 1;
              // validar si hay están los numeros al principio
              if (obj.descripcion.match(/\d+:/).index === 0) {
                return {
                  id: randomId(),
                  descripcion: obj.descripcion,
                };
              }
              return {
                id: randomId(),
                descripcion: cont + ": " + obj.descripcion,
              };
            }
          });
        }
        delete f.nombre;
        dispatch(appendUnitsManagement({ ...f, objetivos: objetivos, nombre: titulo }));
      });
    } else {
      dispatch(cleanUnitsManagement());
    }
  }, [selectedSubject]);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const onSubjectChange = (value) => {
    setSelectedSubject(value.subject);
    dispatch(updateCourseManagement({ ...course, asignatura: value.subject }));
  };

  const addUnit = (unit) => {
    dispatch(appendUnitsManagement(unit));
  };

  return (
    <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{ display: "grid" }}
      onValuesChange={onSubjectChange}>
      <Form.Item label="Cambiar Asignatura: " name="subject">
        {hasSubjects ? (
          <Radio.Group value={selectedSubject}>
            {course.asignaturas.map((subject) => (
              <Radio.Button value={subject.nombre}>{subject.nombre}</Radio.Button>
            ))}
          </Radio.Group>
        ) : (
          <>
            <Paragraph>No existen asignaturas en este curso</Paragraph>
            <Paragraph>Contacte con su administrador</Paragraph>
          </>
        )}
      </Form.Item>
      <Typography>
        <Paragraph>
          <Title level={4}>Información del curso</Title>
          <blockquote>
            Asignatura: {selectedSubject ?? "-"} <br></br>
            Curso: {course.nombre} <br></br>
            Paralelo: {course.paralelo} <br></br>
            Profesor: {teacher.nombres + " " + teacher.apellidos} <br></br>
            Año: {course.anho} <br></br>
          </blockquote>
        </Paragraph>
      </Typography>

      <Title level={4}>Unidades del curso</Title>

      {units == 0 ? (
        <Empty />
      ) : (
        <Collapse>
          {units.map((unit) => (
            <Panel header={<UnitHeader unit={unit} />} width={1000}>
              <UnitBody unit={unit} />
            </Panel>
          ))}
        </Collapse>
      )}
      <br></br>
      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={() =>
          addUnit({
            id: randomId() + "noRegistrado",
            nombre: "Nueva unidad",
            dateRange: [todayDate, todayDate],
            objetivos: [],
            valores: [],
          })
        }
        {...(hasSubjects ? "" : "disabled")}>
        Añadir unidad
      </Button>

      <br></br>

      <DocumentGenerator
        data={{
          course: {
            ...course,
            asignatura: selectedSubject,
          },
          units: units,
          teacher: teacher,
        }}
      />
    </Form>
  );
};

export default Planification;
