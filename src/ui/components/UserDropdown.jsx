import React from "react";

import { Menu, Dropdown, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import teacher from "../../infrastructure/sagas/teacher";

import { isEmpty } from "@utils/isEmpty";

const menuPerfil = (
  <Menu style={{ marginTop: "12px" }}>
    <Menu.Item key={"logout"}>Cerrar sesión</Menu.Item>
  </Menu>
);

const UserDropdown = ({ user }) => {
  const hasName = user.hasOwnProperty("nombres");
  const fullName = !hasName ? " - " : user.nombres + " " + user.apellidos;
  const initals = !hasName ? "?" : user.nombres[0] + user.apellidos[0];

  return (
    <Dropdown overlay={menuPerfil}>
      <a onClick={(e) => e.preventDefault()} style={{ color: "black", justifyItems: "baseline" }}>
        <Avatar size="medium" style={{ marginRight: "10px" }}>
          {initals}
        </Avatar>{" "}
        {fullName} <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default UserDropdown;
