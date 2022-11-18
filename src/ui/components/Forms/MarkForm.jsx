import React, { useEffect, useState } from "react";

// Utils
import { randomId } from "@utils/randomId";
import moment from "moment";

// Antd
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

// Redux
import { useDispatch } from "react-redux";
import { setActiveFilter, addMarks } from "@slices/teachers";

//components
import { Filter, DatePicker } from "@components";

// TODO utilizar este formulario tanto para crear como editr evaluacion
const MarkForm = ({ form, mark, handleOk }) => {
  const { Title } = Typography;
  const dateFormat = "DD/MM/YYYY";
  const dispatch = useDispatch();

  return (
    <Form form={form} onFinish={handleOk} layout={"horizontal"} autoComplete="off">
      <Tooltip
        placement="right"
        title="Es el porcentaje al que equivale esta nota respecto al total de evaluaciones.">
        <Form.Item
          label="Ponderación (%)"
          name="ponderacion"
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
          <InputNumber placeholder={mark.ponderacion * 100} min={0} max={100} />
        </Form.Item>
      </Tooltip>
      <Form.Item
        label={mark.nombre}
        name="nota"
        placeholder={"1.0"}
        maxLength={16}
        rules={[
          {
            required: true,
            message: "Ingrese un valor",
          },
        ]}>
        <InputNumber min={1} placeholder={+mark.nota} max={7} />
      </Form.Item>
    </Form>
  );
};

export default MarkForm;
