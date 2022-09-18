import React from "react";
import { Link, useLocation } from "react-router-dom";

import { BiBookAdd, BiUserPlus, BiGroup, BiHomeAlt } from "react-icons/bi";
import { Menu } from "antd";

const NavigationMenu = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <Menu defaultSelectedKeys={pathname} selectedKeys={pathname}>
      <Menu.Item key="/administrador" icon={<BiHomeAlt />}>
        <Link to="/administrador">Inicio</Link>
      </Menu.Item>
      <Menu.Item key="/administrador/cursos" icon={<BiBookAdd />}>
        <Link to="cursos">Cursos</Link>
      </Menu.Item>
      <Menu.Item key="/administrador/profesores" icon={<BiUserPlus />}>
        <Link to="profesores">Profesores</Link>
      </Menu.Item>
      <Menu.Item key="/administrador/alumnos" icon={<BiGroup />}>
        <Link to="alumnos">Alumnos</Link>
      </Menu.Item>
      <Menu.Item key="/administrador/apoderados" icon={<BiGroup />}>
        <Link to="apoderados">Apoderados</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavigationMenu;
