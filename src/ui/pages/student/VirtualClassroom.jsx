import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// antd
import { Typography, Space, Menu, Select, Modal, Input, Alert } from "antd";
import {
  AppstoreOutlined,
  PlusSquareOutlined,
  CloseSquareFilled,
  MoreOutlined,
  RightOutlined,
} from "@ant-design/icons";
const { TextArea } = Input;

// styles
import "@styles/Home.less";
import "@styles/VirtualClass.less";

// hooks
import { useGetCurrentMonth, useGetCurrentYear, useGetCurrentDay } from "@hooks/useDate";
import { useEffect } from "react";

// Redux
import { fetchCourse, setIsLoading, fetchForumsAndContent } from "@slices/students";

//components
import {
  ForumContent,
  FilterCourse,
  FilterButton,
  ContentTable,
  SearchContent,
  TeacherFilterCourse,
  DefaultTitleContent,
  LoadingSpinner,
} from "@components/index";

//constants
const { Title } = Typography;
const { Option } = Select;

const defaultMenu = [
  {
    label: "No disponible",
    key: "No disponible",
    icon: <CloseSquareFilled />,
  },
];

const Header = ({ title, filterOptions }) => {
  return (
    <div className="header-container">
      <Title>{title}</Title>
      <Space direction="vertical">{filterOptions}</Space>
    </div>
  );
};

const VitualClassroom = () => {
  const dispatch = useDispatch();
  const currentDate = useGetCurrentDay() + "-" + useGetCurrentMonth() + "-" + useGetCurrentYear();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { student, isLoading, filters, course } = useSelector((store) => store.student);
  const [courseHasData, setCourseHasData] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [currentSubMenu, setCurrentSubMenu] = useState(null);
  const [hasMenu, setHasMenu] = useState(false);
  const [hasSubMenu, setHasSubMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchCourse());
  }, []);

  useEffect(() => {
    if (courseHasData) {
      dispatch(fetchForumsAndContent());
    }
  }, [courseHasData]);

  useEffect(() => {
    if (course.hasOwnProperty("id")) setCourseHasData(true);
  }, [course]);

  useEffect(() => {
    setHasMenu(false);
    setHasSubMenu(false);
    if (course && course.hasOwnProperty("asignaturas")) {
      const menu = course.asignaturas[0];
      if (menu) {
        setCurrentMenu(menu);
        if (menu.foros) {
          setHasSubMenu(true);
          const submenu = menu.foros[0];
          if (submenu) {
            setCurrentSubMenu(submenu);
          }
        }
      }
    }
  }, [course]);

  // Validación de asignaturas
  useEffect(() => {
    if (course && course.hasOwnProperty("asignaturas")) setHasMenu(course.asignaturas.length > 0);
  }, [course]);

  // Validacion de foros
  useEffect(() => {
    if (currentMenu && currentMenu.hasOwnProperty("foros"))
      setHasSubMenu(currentMenu.foros.length > 0);
  }, [currentMenu]);

  // Asignaturas del curso
  const subjects = course
    ? course.asignaturas?.map((asignatura) => ({
        label: asignatura.nombre,
        key: asignatura.id,
        icon: <AppstoreOutlined />,
      }))
    : defaultMenu;

  // Unidades o Items de la asignatura
  const subMenuItems =
    currentMenu && currentMenu.hasOwnProperty("foros")
      ? currentMenu.foros.map((foro) => ({
          label: foro.titulo,
          key: foro.id,
          icon: <MoreOutlined />,
        }))
      : defaultMenu;

  const onClickMenu = (e) => {
    // buscar el asignatura del id y setearlo
    let item = course.asignaturas.find((asignatura) => asignatura.id == e.key);
    setHasSubMenu(false);
    setCurrentMenu(item);
    setCurrentSubMenu(item.foros.length > 0 ? item.foros[0] : null);
    console.log("item seleccionado: ", item);
  };

  const onClickSubMenu = (e) => {
    // buscar el asignatura del id y setearlo
    let item = currentMenu.foros.find((foro) => foro.id == e.key);
    setCurrentSubMenu(item);
    console.log("item seleccionado: ", item);
  };

  function onClickAdd() {
    setIsAddOpen(true);
  }
  function handdleClose() {
    setIsAddOpen(false);
    let input = document.getElementById("input");
    let textArea = document.getElementById("textArea");
  }

  return (
    <div>
      <div
        style={{
          justifyContent: "space-between",
          marginTop: "6px",
          alignItems: "flex-start",
          display: "flex",
          marginBottom: "20px",
          flexDirection: "column",
        }}>
        <Title>Aula Virtual</Title>
      </div>

      {hasMenu ? (
        <Menu
          onClick={onClickMenu}
          selectedKeys={[currentMenu.id]}
          mode="horizontal"
          items={subjects}
          defaultSelectedKeys={currentMenu.id}
        />
      ) : (
        <Alert message="No se le han añadido asignaturas actualmente." type="info" showIcon />
      )}

      {hasSubMenu ? (
        <Menu
          onClick={onClickSubMenu}
          selectedKeys={[currentSubMenu.id]}
          mode="horizontal"
          items={subMenuItems}
          defaultSelectedKeys={currentSubMenu.titulo}
        />
      ) : (
        <></>
      )}

      <div className="content-container">
        {hasSubMenu ? (
          <>
            {currentSubMenu.contenidos.map((item) => (
              <ForumContent content={item} isEdit={false} />
            ))}
          </>
        ) : (
          <></>
        )}

        <Modal
          title="Añadir nueva información o tarea"
          open={isAddOpen}
          onOk={handdleClose}
          onCancel={handdleClose}>
          <Input.Group>
            <Input size="large" placeholder="Titulo." prefix={<RightOutlined />} id="input" />
            <TextArea rows={6} placeholder="Contenido." id="textArea" />
          </Input.Group>
        </Modal>
      </div>
    </div>
  );
};

export default VitualClassroom;
