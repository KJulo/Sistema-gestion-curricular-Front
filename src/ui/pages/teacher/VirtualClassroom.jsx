import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// antd
import { Typography, Space, Menu, Select, Modal, Input } from 'antd';
import { AppstoreOutlined, PlusSquareOutlined, CloseSquareFilled, MoreOutlined, RightOutlined } from '@ant-design/icons';
const { TextArea } = Input;

// styles
import '@styles/Home.less';
import '@styles/VirtualClass.less';

// hooks
import { useGetCurrentMonth, useGetCurrentYear, useGetCurrentDay } from '@hooks/useDate';
import { useEffect } from 'react';

//components
import { ForumContent, FilterButton } from '@components/index';

//constants
const { Title } = Typography;
const { Option } = Select;

const defaultMenu = {
  label: 'No disponible',
  key: 'No disponible',
  icon: <CloseSquareFilled />,
}

const Header = ({title, filterOptions}) => {
  return (
    <div className='header-container'>
      <Title>{title}</Title>
      <Space direction='vertical'>
        {filterOptions}
      </Space>
    </div>
  )
}

const VitualClassroom = () => {
  const currentDate = useGetCurrentDay() + '-' + useGetCurrentMonth() + '-' + useGetCurrentYear();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const courses = useSelector((store) => store.teacher.courses.virtualClasses);
  const [currentCourse, setCurrentCourse] = useState(courses[0]);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [currentSubMenu, setCurrentSubMenu] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // El hook useState se actualiza al siguiente render, por ello, utilizar useEffect
  useEffect(() => {
    setCurrentMenu(currentCourse.materias[0]);
    setCurrentSubMenu(currentCourse.materias[0].menus[0]);
    setIsLoaded(true);
  }, [currentCourse])

  // Optiones
  const courseNames = courses.map((course) => course.nombre);

  // Materias del curso
  const subjects = currentCourse ? currentCourse.materias.map((materia) => ({
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

  const handleChange = (value) => {
    let newCourse = courses[value];
    setCurrentCourse(newCourse)
  }

  const onClickMenu = (e) => {
    // buscar el materia del id y setearlo
    let item = currentCourse.materias.find((materia) => materia.id == e.key)
    setCurrentMenu(item);
    console.log("item seleccionado: ",item);
  };

  const onClickSubMenu = (e) => {
    // buscar el materia del id y setearlo
    let item = currentMenu.menus.find((menu) => menu.id == e.key)
    setCurrentSubMenu(item);
  };

  function onClickAdd () {setIsAddOpen(true)}
  function handdleClose () {
    setIsAddOpen(false);
    let input = document.getElementById("input");
    let textArea = document.getElementById("textArea");
  }

  return isLoaded ? (
    <div>
      <div
        style={{
          justifyContent: "space-between",
          marginTop: "6px",
          alignItems: "flex-start",
          display: "flex",
          marginBottom: "20px",
          flexDirection: 'column',
      }}>
        <Title>Aula Virtual</Title>
        <FilterButton options={courseNames} onChange={handleChange}/>
      </div>

      <Menu
        onClick={onClickMenu}
        selectedKeys={[currentMenu.id]}
        mode='horizontal'
        items={subjects}
        defaultSelectedKeys={currentMenu.id}
      />
      <Menu
        onClick={onClickSubMenu}
        selectedKeys={[currentSubMenu.id]}
        mode='horizontal'
        items={subMenuItems}
        defaultSelectedKeys={currentMenu.menus[0].nombre}
        />

      <div className='content-container'>
        {currentSubMenu.contenido.map((item) => (
          <ForumContent content={item} />
        ))}

        <PlusSquareOutlined onClick={() => {onClickAdd()}} />
        <Modal title="Añadir nueva información o tarea" open={isAddOpen} onOk={handdleClose} onCancel={handdleClose}>
          <Input.Group>
            <Input size="large" placeholder="Titulo." prefix={<RightOutlined />} id="input"/>
            <TextArea rows={6} placeholder="Contenido." id="textArea"/>
          </Input.Group>
        </Modal>
      </div>
    </div>
  ) : <></>;
}

export default VitualClassroom;