import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// antd
import { Typography, Card, Menu, Select, Modal, Input, Alert, Layout, Checkbox } from "antd";
const { Sider, Content } = Layout;
const { TextArea } = Input;
import {
  AppstoreOutlined,
  PlusSquareOutlined,
  CloseSquareFilled,
  MoreOutlined,
  RightOutlined,
} from "@ant-design/icons";

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
  addContent,
  fetchForumsAndContent,
} from "@slices/teachers";

//components
import { ForumContent, FilterButton, LoadingSpinner, DefaultTitleContent } from "@components/index";

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
  const [isAddOpen, setIsAddOpen] = useState(false);

  const {
    isLoading,
    process,
    courses: { list: courses },
  } = useSelector((store) => store.teacher);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [currentSubMenu, setCurrentSubMenu] = useState(null);
  const [hasMenu, setHasMenu] = useState(false);
  const [hasSubMenu, setHasSubMenu] = useState(false);
  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  useEffect(() => {
    dispatch(fetchForumsAndContent());
  }, [courses.length]);

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
        if (menu.foros && menu.foros.length > 0) {
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
    console.log(value);
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
    const title = document.getElementById("input").value;
    const body = document.getElementById("textArea").value;
    dispatch(
      addContent({ id_foro: currentSubMenu.id, titulo: title, descripcion: body, tipo: "content" })
    );
  }

  const onChangeCheckbox = (e) => {
    console.log(`checked = `, e);
  };

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
        <DefaultTitleContent
          title={"Módulo Aula Virtual"}
          subtitle="¡Haz click abajo para cambiar de curso! Recuerda que tu administrador designa tus cursos."
        />
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

      <Layout className="content-container flex">
        {hasSubMenu ? (
          <>
            <Content>
              {currentSubMenu.contenidos.map((item) => (
                <ForumContent
                  content={item}
                  isEdit={true}
                  process={process}
                  isLoading={isLoading}
                  forumId={currentSubMenu.id}
                />
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
                style={{ marginBottom: 20 }}
                onClick={() => {
                  onClickAdd();
                }}
              />
            </Content>
            <div className="side-objetives">
              {currentSubMenu.objetivos.length > 0 && (
                <Card title="Objetivos" style={{ width: 300 }} hoverable>
                  <Checkbox.Group
                    className="vertical-flex"
                    style={{
                      width: "100%",
                    }}
                    onChange={onChangeCheckbox}>
                    {currentSubMenu.objetivos.map((obj) => (
                      <li>{obj.descripcion}</li>
                      // TODO implementar el checkbox de los objetivos
                      // <Checkbox value={obj.descripcion} style={{ margin: 0 }}>
                      //   {obj.descripcion}
                      // </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Card>
              )}
            </div>
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
      </Layout>
    </div>
  );
};

export default VitualClassroom;
