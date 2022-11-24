import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// antd
import { Typography, Menu, Select, Modal, Input, Alert, Col, Row } from "antd";
import {
  AppstoreOutlined,
  CloseSquareFilled,
  MoreOutlined,
  RightOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
const { TextArea } = Input;

// styles
import "@styles/Home.less";
import "@styles/VirtualClass.less";

// hooks
import { useGetCurrentMonth, useGetCurrentYear, useGetCurrentDay } from "@hooks/useDate";
import { useEffect } from "react";

// Redux
import { fetchCourse } from "@slices/students";

//components
import { ForumContent, DefaultTitleContent, LoadingSpinner } from "@components/index";

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
    setHasMenu(false);
    setHasSubMenu(false);
    // La primera vez que se traiga el contenido ejecutr esto
    if (course && course.hasOwnProperty("id") && !courseHasData) {
      setCourseHasData(true);
    }
    // Las demás veces solo traer la data
    if (course && course.hasOwnProperty("asignaturas")) {
      setHasMenu(course.asignaturas.length > 0);
      const menu = course.asignaturas[0];
      if (menu) {
        console.log(menu);
        setCurrentMenu(menu);
        if (menu.foros && menu.foros.length > 0) {
          setHasSubMenu(true);
          const submenu = menu.foros[0];
          if (submenu) {
            console.log(submenu);
            setCurrentSubMenu(submenu);
          }
        }
      }
    }
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
    setCurrentSubMenu(item.foros?.length > 0 ? item.foros[0] : null);
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
    <LoadingSpinner isLoading={isLoading}>
      <DefaultTitleContent
        title={
          <Col>
            <Row>Aula Virtual</Row>
            {course && JSON.stringify(course) !== "{}" ? (
              <Row>{course.nombre + " - " + course.paralelo}</Row>
            ) : course === undefined ? (
              <Title level={4} style={{ marginTop: 0 }}>
                Sin curso asignado.
              </Title>
            ) : (
              <LoadingSpinner isLoading={true} size={"small"} />
            )}
          </Col>
        }
        subtitle="Aquí podrás revisar las unidades y material de tu curso."
      />

      <div style={{ marginLeft: -19 }}>
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
            currentSubMenu?.contenidos.length > 0 ? (
              currentSubMenu?.contenidos?.map((item) => (
                <ForumContent content={item} isEdit={false} />
              ))
            ) : (
              <>
                <InfoCircleOutlined /> Sin contenidos aún.
              </>
            )
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
    </LoadingSpinner>
  );
};

export default VitualClassroom;
