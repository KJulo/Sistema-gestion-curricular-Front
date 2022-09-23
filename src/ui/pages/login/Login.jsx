import React, { useState, useEffect } from 'react';
import {Button, Checkbox, Form, Input, Anchor} from 'antd';
import '@styles/LoginPage.less'

const { Link } = Anchor;

const styleForm = {
  margin: '20%',
  marginTop: 0
};
const styleFormItem = {
  margin: '0 0 10px 0',
};

const Login = () => {
  const [auth, setAuth] = useState(false);

  // Redirect
  useEffect(() => {
    if (auth) {
      window.location.replace('/profesor')
    }
  }, [auth])

  const onFinish = (values) => {
    console.log('Exito:', values);
    setAuth(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Fallo:', errorInfo);
  };

  return (
    <div>
      <h1 className='login-title'> Bienvenidos! </h1>

      <Form
        name='basic'
        initialValues={{
          remember: true,
          layout: 'vertical',
        }}
        labelCol={{
          span: 5,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        style={styleForm}>
        <Form.Item
          label='Usuario'
          name='usuario'
          rules={[
            {
              required: true,
              message: 'Ingrese un usuario válido',
            },
          ]}
          style={styleFormItem}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Contraseña'
          name='contraseña'
          rules={[
            {
              required: true,
              message: 'Ingrese una contraseña válida',
            },
          ]}
          style={styleFormItem}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{
            offset: 5,
            span: 22,
          }}>
          <Checkbox>Recordarme</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 22,
          }}>
          <Button type='primary' htmlType='submit'>
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
