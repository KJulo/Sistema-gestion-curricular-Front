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
      key: "/profesor", 
      icon: <BiHomeAlt />,
      label: <Link to="/profesor">Inicio</Link>,
    }, {
      key: "/profesor/modulo-notas",
      icon: <BiBookAdd />,
      label: <Link to="modulo-notas">Notas</Link>,
    }, {
      key: "/profesor/modulo-asistencia",
      icon: <BiUserPlus />,
      label: <Link to="modulo-asistencia">Asistencia</Link>,
    }, {
      key: "/profesor/modulo-aulas",
      icon: <BiGroup />,
      label: <Link to="modulo-aulas">Aulas</Link>,
    }
  ]
  return (
    <Menu defaultSelectedKeys={pathname} selectedKeys={pathname} items={menuItems} />
  );
};

export default NavigationMenu;