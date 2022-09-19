import React from "react";
import { Link, useLocation } from "react-router-dom";

import { BiBookAdd, BiUserPlus, BiGroup, BiHomeAlt } from "react-icons/bi";
import { Menu } from "antd";

const NavigationMenu = () => {
  const { pathname } = useLocation();
  const menuItems = [
    {
      key: "/administrador", 
      icon: <BiHomeAlt />,
      label: <Link to="/administrador">Inicio</Link>,
    }, {
      key: "/administrador/cursos",
      icon: <BiBookAdd />,
      label: <Link to="cursos">Cursos</Link>,
    }, {
      key: "/administrador/profesores",
      icon: <BiUserPlus />,
      label: <Link to="profesores">Profesores</Link>,
    }, {
      key: "/administrador/alumnos",
      icon: <BiGroup />,
      label: <Link to="alumnos">Alumnos</Link>,
    }, {
      key: "/administrador/apoderados",
      icon: <BiGroup />,
      label: <Link to="apoderados">Apoderados</Link>,
    }
  ]
  return (
    <Menu defaultSelectedKeys={pathname} selectedKeys={pathname} items={menuItems} />
  );
};

export default NavigationMenu;
