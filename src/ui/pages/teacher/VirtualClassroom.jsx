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
import {
  fetchStudents,
  fetchCourses,
  fetchStudentsNotes,
  setIsLoading,
  fetchForumsAndContent,
} from "@slices/teachers";

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

  const courses = useSelector((store) => store.teacher.courses.list);
  const isLoading = useSelector((store) => store.teacher.isLoading);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [currentSubMenu, setCurrentSubMenu] = useState(null);
  const [hasMenu, setHasMenu] = useState(false);
  const [hasSubMenu, setHasSubMenu] = useState(false);
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchForumsAndContent());
  }, []);

  // El hook useState se actualiza al siguiente render, por ello, utilizar useEffect
  useEffect(() => {
    if (courses.length > 0) setCurrentCourse(courses[0]);
  }, [courses]);

  useEffect(() => {
    setHasMenu(false);
    setHasSubMenu(false);
    if (currentCourse) {
      const menu = currentCourse.asignaturas[0];
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
  }, [currentCourse]);

  // Validación de asignaturas
  useEffect(() => {
    if (currentCourse && currentCourse.hasOwnProperty("asignaturas"))
      setHasMenu(currentCourse.asignaturas.length > 0);
  }, [currentCourse]);

  // Validacion de foros
  useEffect(() => {
    if (currentMenu && currentMenu.hasOwnProperty("foros"))
      setHasSubMenu(currentMenu.foros.length > 0);
  }, [currentMenu]);

  // Optiones
  const courseNames = courses.map((course) => course.nombre + " - " + course.paralelo);

  // Asignaturas del curso
  const subjects = currentCourse
    ? currentCourse.asignaturas.map((asignatura) => ({
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

  const handleChange = (value) => {
    console.log("id curso: ", value);
    if (courses[value] !== currentCourse) {
      setCurrentCourse(courses[value]);
    }
  };

  const onClickMenu = (e) => {
    // buscar el asignatura del id y setearlo
    let item = currentCourse.asignaturas.find((asignatura) => asignatura.id == e.key);
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
        <LoadingSpinner isLoading={isLoading}>
          <FilterButton options={courseNames} onChange={handleChange} />
        </LoadingSpinner>
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
        <Alert
          message="Si no le aparecen las asignaturas de este curso, contactarse con su administrador."
          type="info"
          showIcon
        />
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
        <Alert
          message="Para añadir sub-menus, ir a inicios y añadir 'Unidades' en la planificación de este curso"
          type="info"
          showIcon
        />
      )}

      <div className="content-container">
        {hasSubMenu ? (
          <>
            {currentSubMenu.contenidos.map((item) => (
              <ForumContent content={item} isEdit={true} />
            ))}
            {currentSubMenu.contenidos.length === 0 ? (
              <Alert
                message="Para añadir material, hacer click en el botón de abajo."
                type="info"
                showIcon
                style={{ marginBottom: 20 }}
              />
            ) : (
              <></>
            )}
            <PlusSquareOutlined
              onClick={() => {
                onClickAdd();
              }}
            />
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
