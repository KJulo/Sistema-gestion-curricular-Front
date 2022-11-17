import React from "react";
import { selectCurrentUser } from "@slices/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Typography,
  Avatar,
  Divider,
  Form,
  Input,
  Button,
  Spin,
} from "antd";

import { DefaultTitleContent, EditPassword } from "@components/index";
const { Text, Title } = Typography;

const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    console.log("reset");
    form.resetFields();
  };

  if (user) {
    return (
      <Row style={{ display: "flex", flexFlow: "column" }}>
        <Col>
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <DefaultTitleContent title="Información personal" action={<EditPassword user={user} />} />
            <Avatar size={128} icon={<UserOutlined />} />
            <Text strong>Nombre(s): {user.nombres}</Text>
            <Text strong>Apellido(s): {user.apellidos}</Text>
            <Text strong>Correo: {user.correo}</Text>
            <Text strong>Rut: {user.rut}</Text>
          </div>
        </Col>
      </Row>
    );
  } else {
    return <Spin />;
  }
};

export default Profile;
