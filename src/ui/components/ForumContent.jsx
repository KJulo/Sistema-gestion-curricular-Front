import React, { useState, useEffect } from "react";
import "@styles/VirtualClass.less";

import { EditOutlined, DeleteOutlined, CalendarOutlined, RightOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Button,
  Modal,
  Input,
  message,
  Popconfirm,
  DatePicker,
  Select,
  Space,
  TimePicker,
} from "antd";
const { Option } = Select;
const { TextArea } = Input;

const ForumContent = ({ content, isEdit }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const text = "¿Desea eliminar esto?";

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
    gap: 20,
  };
  const modalStyle = {
    gap: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  };

  function onClickEdit() {
    setIsEditOpen(true);
  }
  function onClickCalendar() {
    setIsCalendarOpen(true);
  }
  function handdleClose() {
    setIsEditOpen(false);
    setIsCalendarOpen(false);
    let input = document.getElementById("input");
    let textArea = document.getElementById("textArea");
  }

  const confirm = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
        message.info("Se ha eliminado.");
      }, 3000);
    });
  };

  return (
    <>
      <div className="item-container">
        <Row style={rowStyle}>
          <h3 style={{ margin: 0 }}>{"> " + content.titulo}</h3>
          {isEdit ? (
            <div style={{ gap: 5, display: "flex" }}>
              <EditOutlined onClick={() => onClickEdit(content)} />
              <Popconfirm
                placement="rightTop"
                title={text}
                onConfirm={confirm}
                okText="Eliminar"
                cancelText="Cancelar">
                <DeleteOutlined />
              </Popconfirm>
              <CalendarOutlined onClick={() => onClickCalendar(content)} />
            </div>
          ) : (
            <></>
          )}
        </Row>
        <p>{content.descripcion}</p>
      </div>

      <Modal title="Editar" open={isEditOpen} onOk={handdleClose} onCancel={handdleClose}>
        <Input.Group>
          <Input
            defaultValue={content.titulo}
            size="large"
            placeholder="Titulo."
            prefix={<RightOutlined />}
            id="input"
          />
          <TextArea
            defaultValue={content.descripcion}
            rows={6}
            placeholder="Contenido."
            id="textArea"
          />
        </Input.Group>
      </Modal>

      <Modal
        title="Añadir tiempo"
        open={isCalendarOpen}
        onOk={handdleClose}
        onCancel={handdleClose}>
        <Input.Group style={modalStyle}>
          <DatePicker onChange={(value) => console.log(value)} />
          <TimePicker onChange={(value) => console.log(value)} />
        </Input.Group>
      </Modal>
    </>
  );
};

export default ForumContent;
