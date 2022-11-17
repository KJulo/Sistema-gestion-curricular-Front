import React from "react";
import { useDispatch } from "react-redux";
import {
  appendObjetiveManagement,
  updateDateManagement,
  appendValueManagement,
} from "@slices/teachers";
import { randomId } from "@utils/randomId";

import { PlusOutlined } from "@ant-design/icons";
import { Typography, Button, DatePicker, Row, Col } from "antd";
const { Title } = Typography;
const { RangePicker } = DatePicker;
import moment from "moment";

import { Objetive, Value } from "@components";
import { useEffect } from "react";

const UnitBody = ({ unit }) => {
  const dispatch = useDispatch();
  const dateFormat = "YYYY/MM/DD";
  const todayDate = moment(new Date()).format(dateFormat);

  const addOjetive = (objetive) => {
    dispatch(appendObjetiveManagement({ unit: unit, objetive: objetive }));
  };

  const addValue = (value) => {
    dispatch(appendValueManagement({ unit: unit, value: value }));
  };

  const onChange = (date, dateString) => {
    dispatch(updateDateManagement({ unit: unit, dateRange: dateString }));
  };

  return (
    <Col>
      <Title level={5}>Duración de la unidad</Title>
      <RangePicker
        defaultValue={[
          moment(unit.dateRange[0], dateFormat),
          moment(unit.dateRange[1], dateFormat),
        ]}
        format={dateFormat}
        onChange={onChange}
      />

      <Title level={5} style={{ marginTop: 20 }}>
        Objetivos
      </Title>

      {unit.objetivos?.length > 0 ? (
        unit.objetivos.map((obj, i) => {
          if (obj) {
            return <Objetive unit={unit} objetive={obj} index={i} />;
          } else {
            return <></>;
          }
        })
      ) : (
        <></>
      )}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={() =>
          addOjetive({
            id: randomId(),
            descripcion: unit.objetivos.length + 1 + ": Objetivo " + (unit.objetivos.length + 1),
          })
        }>
        Añadir objetivo
      </Button>

      <Title level={5} style={{ marginTop: 20 }}>
        Valores
      </Title>

      {unit.valores?.length > 0 ? (
        unit.valores.map((value, i) => <Value unit={unit} value={value} index={i} />)
      ) : (
        <></>
      )}

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={() => {
          const lengthValores = unit.valores ? unit.valores.length : 0;
          addValue({
            id: randomId() + "noRegistrado",
            descripcion: lengthValores + 1 + ": Valor " + (lengthValores + 1),
          });
        }}>
        Añadir valor
      </Button>
    </Col>
  );
};

export default UnitBody;
