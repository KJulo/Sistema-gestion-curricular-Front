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
      key: "/estudiante", 
      icon: <BiHomeAlt />,
      label: <Link to="/estudiante">Inicio</Link>,
    }, {
      key: "/estudiante/aula-virtual",
      icon: <BiBookAdd />,
      label: <Link to="aula-virtual">Aula Virtual</Link>,
    }, {
      key: "/estudiante/notas",
      icon: <BiBookAdd />,
      label: <Link to="notas">Notas</Link>,
    }, {
      key: "/estudiante/asistencia",
      icon: <BiUserPlus />,
      label: <Link to="asistencia">Asistencia</Link>,
    }
  ]
  return (
    <Menu defaultSelectedKeys={pathname} selectedKeys={pathname} items={menuItems} />
  );
};

export default NavigationMenu;