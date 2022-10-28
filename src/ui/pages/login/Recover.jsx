import React, { useState, useEffect } from 'react';

import { Button, Checkbox, Form, Input, message, Typography  } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
const { Title } = Typography;

import '@styles/LoginPage.less'

const Recover = () => {
  const [auth, setAuth] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  // Redirect
  useEffect(() => {
    if (auth) {
      window.location.replace('/login')
    }
  }, [auth])

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // error()
  };

  const error = () => {
    setErrorCount(errorCount+1);
    if (errorCount < 2)
      message.error('Algo a salido mal, inténtelo de nuevo.');
    else
      message.warning('Demasiados intentos fallidos, compruebe su conexión a internet ' +
                      'o contacte a su institución educativa.', 10);
  };

  return (
    <div className='login-container'>
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Recuperar
          </Button>
          o ir a <a href="login" >Iniciar Sesión</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Recover;
