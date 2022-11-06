import React, { useState, useEffect } from "react";

import { Button, Checkbox, Form, Input, message, Select, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const { Title } = Typography;

import "@styles/LoginPage.less";
import { Link, useNavigate } from "react-router-dom";

import { useAxios } from "@hooks/useRecoverPassword";
import axios from "axios";

const Recover = () => {
  const [errorCount, setErrorCount] = useState(0);
  const navigate = useNavigate();
  
  
  const onFinish = async(values) => {
    try {
      await axios.post("/api/usuario/forgotPassword", values);
      message.success("Si el rut ingresado existe en el sistema, se le enviará un correo con su nueva contraseña.");
    } catch (error) {
      message.error("No se pudo enviar el correo, inténtelo de nuevo.");
    }
  };

  const error = () => {
    setErrorCount(errorCount + 1);
    if (errorCount < 2) message.error("Algo a salido mal, inténtelo de nuevo.");
    else
      message.warning(
        "Demasiados intentos fallidos, compruebe su conexión a internet " +
          "o contacte a su institución educativa.",
        10
      );
  };

  return (
    <div className="login-container">
      <Title level={2}>Recuperar contraseña</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        layout="vertical"
      >
       
        <Form.Item
          label="Tipo de usuario"
          name="type"
          rules={[
            {
              required: true,
              message: "Porfavor, seleccione el tipo de usuario",
            },
          ]}
        >
          <Select>
            <Select.Option value="alumno">Alumno</Select.Option>
            <Select.Option value="apoderado">Apoderado</Select.Option>
            <Select.Option value="profesor">Profesor</Select.Option>
            <Select.Option value="administrador">Administrador</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="rut"
          label="Rut"
          rules={[
            {
              required: true,
              message: "Porfavor, ingrese su Rut.",
            },
            {
              pattern: /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/,
              message: "Rut invalido",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="12.345.678-9"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Recuperar
          </Button>
          o ir a <Link to={"/login"}>Iniciar Sesión</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Recover;
