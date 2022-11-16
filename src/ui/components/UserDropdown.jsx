import React from "react";

import { Menu, Dropdown, Avatar, Row, Col, Button, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import teacher from "../../infrastructure/sagas/teacher";

import { Link } from "react-router-dom";

import { isEmpty } from "@utils/isEmpty";
import { logOut } from "../../application/config/redux/slices/auth/authSlice";
import { LogoutOutlined } from "@ant-design/icons";

const UserDropdown = ({ user }) => {
  const dispatch = useDispatch();
  return (
    user && (
      <Row justify="end" style={{ gap: "16px", flexWrap: "wrap" }}>
        <Col md={12}>
          <Link to="perfil">
            <div style={{ color: "black", justifyItems: "baseline" }}>
              <Avatar size="medium" style={{ marginRight: "10px" }}>
                {user.nombres[0]}
              </Avatar>{" "}
              {`${user.nombres} ${user.apellidos}`}
            </div>{" "}
          </Link>
        </Col>
        <Col>
          <Tooltip title="Cerrar sesión">
            <Button
              type="danger"
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}>
              <LogoutOutlined />
            </Button>
          </Tooltip>
        </Col>
      </Row>
    )
  );
};

export default UserDropdown;
