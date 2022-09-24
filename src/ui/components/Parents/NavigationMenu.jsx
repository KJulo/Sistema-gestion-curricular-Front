import React from "react";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";

import { BiBookAdd, BiUserPlus, BiGroup, BiHomeAlt } from "react-icons/bi";
import { Menu } from "antd";

const NavigationMenu = () => {
  const { pathname } = useLocation();
  const resolver = useResolvedPath(pathname);
  const match = useMatch(resolver.pathname);
  console.log(match);
  
  const menuItems = [
    {
      key: "/apoderado", 
      icon: <BiHomeAlt />,
      label: <Link to="/apoderado">Inicio</Link>,
    }, {
      key: "/apoderado/notas",
      icon: <BiBookAdd />,
      label: <Link to="notas">Notas</Link>,
    }, {
      key: "/apoderado/asistencia",
      icon: <BiUserPlus />,
      label: <Link to="asistencia">Asistencia</Link>,
    }
  ]
  return (
    <Menu defaultSelectedKeys={pathname} selectedKeys={pathname} items={menuItems} />
  );
};

export default NavigationMenu;