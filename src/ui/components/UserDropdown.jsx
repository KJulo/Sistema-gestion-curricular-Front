import React from "react";

import { Menu, Dropdown, Avatar, Row, Col, Button, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import teacher from "../../infrastructure/sagas/teacher";

import { isEmpty } from "@utils/isEmpty";
import { logOut } from "../../application/config/redux/slices/auth/authSlice";
import { LogoutOutlined } from "@ant-design/icons";

const UserDropdown = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <Row justify="end" style={{ gap: "16px", flexWrap: "wrap" }}>
      <Col xs={0} sm={0} md={12}>
        <a
          onClick={(e) => e.preventDefault()}
          style={{ color: "black", justifyItems: "baseline" }}
        >
          <Avatar size="medium" style={{ marginRight: "10px" }}>
            {user?.nombres[0]}
          </Avatar>{" "}
          {`${user?.nombres} ${user?.apellidos}`}
        </a>{" "}
      </Col>
      <Col>
        <Tooltip title="Cerrar sesión">
          <Button
            type="danger"
            onClick={() => {
              dispatch(logOut());
            }}
          >
            <LogoutOutlined />
          </Button>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default UserDropdown;
