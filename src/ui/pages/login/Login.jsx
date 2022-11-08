import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../application/config/redux/slices/auth/authSlice";
import { useLoginMutation } from "../../../application/config/redux/slices/auth/authApiSlice";

import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  Typography,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const { Title } = Typography;

import "@styles/LoginPage.less";

const Login = () => {
  const [auth, setAuth] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const userData = await login(values).unwrap();
      console.log(userData);
      dispatch(setCredentials(userData));
      navigate(`/${values.type}/home`);
    } catch (err) {
      if (err?.originalStatus) {
        message.error("No hay respuesta del servidor");
      } else if (err?.status === 400) {
        message.error("Usuario o contraseña incorrectos");
      } else if (err?.status === 401) {
        message.error(err?.data?.error);
      } else {
        message.error("Error desconocido");
      }
      error();
    }
  };

  const error = () => {
    setErrorCount(errorCount + 1);
    if (errorCount > 2) {
      message.warning(
        "Demasiados intentos fallidos, compruebe su conexión a internet " +
          "o contacte a su institución educativa.",
        10
      );
    }
  };

  const info = () => {
    message.info(
      "Lo sentimos, el registro no se encuentra habilitado, " +
        "contacte a su institución educativa en caso de presentar " +
        "problemas al momento de ingresar a la plataforma. ",
      10
    );
  };

  return (
    <div className="login-container">
      <Title level={2}>Iniciar Sesión</Title>
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
              message: "Porfavor, ingrese su rut.",
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
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: "Porfavor, ingrese su contraseña.",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="********"
          />
        </Form.Item>
        <Form.Item>
          <Link to="/recover" className="login-form-forgot">
            Olvide mi contraseña
          </Link>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Ingresar
          </Button>
          o ir a{" "}
          <Link to="#" onClick={info}>
            Registrarse
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
