import React, { useState, useEffect } from 'react';

import { Button, Checkbox, Form, Input, message, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
const { Title } = Typography;

import '@styles/LoginPage.less'

const Login = () => {
  const [auth, setAuth] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  // Redirect
  useEffect(() => {
    if (auth) {
      window.location.replace('/profesor')
    }
  }, [auth])

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // error()
    setAuth(true);
  };

  const error = () => {
    setErrorCount(errorCount+1);
    if (errorCount < 2)
      message.error('Algo a salido mal, inténtelo de nuevo.');
    else
      message.warning('Demasiados intentos fallidos, compruebe su conexión a internet ' +
                      'o contacte a su institución educativa.', 10);
  };

  const info = () => {
    message.info('Lo sentimos, el registro no se encuentra habilitado, ' +
                 'contacte a su institución educativa en caso de presentar ' +
                 'problemas al momento de ingresar a la plataforma. ', 10);
  };

  return (
    <div className='login-container'>
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
          name="username"
          label="Usuario"
          rules={[
            {
              required: true,
              message: 'Porfavor, ingrese su usuario.',
            },
          ]}
          >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="12345678-9" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: 'Porfavor, ingrese su contraseña.',
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Recordarme</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="recover">
            Olvidé mi contraseña
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Ingresar
          </Button>
          o ir a <a href="#" onClick={info} >Registrarse</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
