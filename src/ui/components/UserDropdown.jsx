import React from "react";

import { Menu, Dropdown, Avatar, Row, Col, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import teacher from "../../infrastructure/sagas/teacher";

import { isEmpty } from "@utils/isEmpty";
import { logOut } from "../../application/config/redux/slices/auth/authSlice";

const UserDropdown = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <Row justify="end" style={{gap:"16px"}}>
      <Col>
        <a
          onClick={(e) => e.preventDefault()}
          style={{ color: "black", justifyItems: "baseline" }}
        >
          <Avatar size="medium" style={{ marginRight: "10px" }}>
            {user?.nombres[0]}
          </Avatar>{" "}
          {`${user?.nombres} ${user?.apellidos}`}
        </a>
      </Col>
      <Col>
        <Button
          type="danger"
          onClick={() => {
            dispatch(logOut());
          }}
        >
          Cerrar sesión
        </Button>
      </Col>
    </Row>
  );
};

export default UserDropdown;
