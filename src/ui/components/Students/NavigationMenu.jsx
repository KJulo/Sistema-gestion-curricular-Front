import React from "react";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";

import { BiBookAdd, BiUserPlus, BiGroup, BiHomeAlt } from "react-icons/bi";
import { Menu } from "antd";

const NavigationMenu = () => {
  const { pathname } = useLocation();
  const resolver = useResolvedPath(pathname);
  const match = useMatch(resolver.pathname);

  const menuItems = [
    {
      key: "/alumno",
      icon: <BiHomeAlt />,
      label: <Link to="/alumno">Inicio</Link>,
    },
    {
      key: "/alumno/aula-virtual",
      icon: <BiBookAdd />,
      label: <Link to="aula-virtual">Aula Virtual</Link>,
    },
    {
      key: "/alumno/notas",
      icon: <BiBookAdd />,
      label: <Link to="notas">Notas</Link>,
    },
    {
      key: "/alumno/asistencia",
      icon: <BiUserPlus />,
      label: <Link to="asistencia">Asistencia</Link>,
    },
  ];
  return <Menu defaultSelectedKeys={pathname} selectedKeys={pathname} items={menuItems} />;
};

export default NavigationMenu;
