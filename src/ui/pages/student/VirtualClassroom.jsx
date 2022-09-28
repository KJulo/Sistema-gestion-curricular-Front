import React, { useState } from 'react';

// antd
import { Typography, Space, Menu } from 'antd';
import { AppstoreOutlined, CalendarOutlined, CloseSquareFilled, MoreOutlined } from '@ant-design/icons';
const { Title } = Typography;

// styles
import '@styles/Home.less';
import '@styles/VirtualClass.less';

// hooks
import { useGetCurrentMonth, useGetCurrentYear, useGetCurrentDay } from '@hooks/useDate';

const course = {
  id: '41kd2fj94fi32fui',
  nombre: '1ro Básico',
  materias: [
    {
      id: 'jd128d3912',
      nombre: 'Lenguaje',
      menus: [
        { 
          id: 'cwqiecejcjw',
          nombre: 'Unidad 1',
          contenido: [
            {
              titulo: 'Modulo 1',
              cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'+'\n'+
              'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+'\n'+
              'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            },{
              titulo: 'Modulo 2',
              cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'+'\n'+
              'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+'\n'+
              'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          ]
        },{ 
          id: 'dj312938d12j83',
          nombre: 'Unidad 2',
          contenido: [
            {
              titulo: 'Primera tarea lenguaje',
              cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
            }
          ]
        }
      ]
    },
    {
      id: 'ej21vn21ff',
      nombre: 'Matemáticas',
      menus: [
        { 
          id: '21duj3jd13d3d21',
          nombre: 'Tarea 1',
          contenido: [
            {
              titulo: 'Modulo 1',
              cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'+'\n'+
              'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+'\n'+
              'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            },{
              titulo: 'Modulo 2',
              cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'+'\n'+
              'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+'\n'+
              'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          ]
        }
      ],
    },
    {
      id: 'jf12f4124j',
      nombre: 'Historia',
      menus: [
        { 
          id: 'j3d12j3dj12j3',
          nombre: 'Bievenida',
          contenido: [
            {
              titulo: 'Hola !',
              cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'+'\n'+
              'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
            },{
              titulo: 'Modulo 1 ',
              cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'+'\n'+
              'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+'\n'+
              'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          ]
        }
      ],
    },
  ]
}

const defaultMenu = {
  label: 'No disponible',
  key: 'No disponible',
  icon: <CloseSquareFilled />,
}

const Header = ({title, date}) => {
  return (
    <div className='header-container'>
      <Title>{title}</Title>
      <Space direction='vertical'>
        <div className='date-container'>
          <Title level={5} style={{ marginBottom: 5 }}>
            {date}
          </Title>
          <CalendarOutlined twoToneColor='#bfbfbf' style={{ fontSize: 'large' }} />
        </div>
      </Space>
    </div>
  )
}

const MenuContent = ({content}) => {
  return (
    <div className='content-container'>
        {content.map((item) => (
          <div className='item-container'>
          <h3>{'> ' + item.titulo}</h3>
          <p>{item.cuerpo}</p>
        </div>
      ))}
    </div>
  )
}

const VitualClassroom = () => {
  const currentDate = useGetCurrentDay() + '-' + useGetCurrentMonth() + '-' + useGetCurrentYear();
  const [currentMenu, setCurrentMenu] = useState(course.materias[0]);
  const [currentSubMenu, setCurrentSubMenu] = useState(course.materias[0].menus[0])

  // Materias del curso
  const menuItems = course ? course.materias.map((materia) => ({
    label: materia.nombre,
    key: materia.id,
    icon: <AppstoreOutlined />,
  })) : defaultMenu;

  // Unidades o Items de la materia
  const subMenuItems = currentMenu ? currentMenu.menus.map((menu) => ({
    label: menu.nombre,
    key: menu.id,
    icon: <MoreOutlined />,
  })) : null

  const onClickMenu = (e) => {
    // buscar el materia del id y setearlo
    let item = course.materias.find((materia) => materia.id == e.key)
    setCurrentMenu(item);
    console.log("item seleccionado: ",item);
  };

  const onClickSubMenu = (e) => {
    console.log('click ', e.key);
    // buscar el materia del id y setearlo
    let item = currentMenu.menus.find((menu) => menu.id == e.key)
    setCurrentSubMenu(item);
    console.log("item seleccionado: ",item);
  };

  return (
    <div>
      <div
        style={{
          justifyContent: "space-between",
          marginTop: "6px",
          alignItems: "flex-start",
          display: "flex",
          marginBottom: "10px",
          flexDirection: 'column',
      }}>
        <Title>Aula Virtual</Title>
      </div>

      <Menu onClick={onClickMenu} selectedKeys={[currentMenu.id]} mode="horizontal" items={menuItems} defaultSelectedKeys={currentMenu.id} />
      <Menu onClick={onClickSubMenu} selectedKeys={[currentSubMenu.id]} mode="horizontal" items={subMenuItems} defaultSelectedKeys={currentMenu.menus[0].nombre} />

      <MenuContent content={currentSubMenu.contenido} />
    </div>
  )
}

export default VitualClassroom;