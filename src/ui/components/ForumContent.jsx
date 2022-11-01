import React, { useState, useEffect } from "react";
import "@styles/VirtualClass.less";

import { deleteContent } from "@slices/teachers";
import { useDispatch } from "react-redux";

// Redux
import { editContent } from "@slices/teachers";

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

const ForumContent = ({ content, isEdit, process, forumId }) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const messageTime = 2000;

  const onDeleteText = "¿Desea eliminar esto?";

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
  function handdleOkContent() {
    setIsEditOpen(false);
    const title = document.getElementById("input").value;
    const body = document.getElementById("textArea").value;
    dispatch(
      editContent({
        id: content.id,
        id_foro: forumId,
        titulo: title,
        descripcion: body,
        tipo: "content",
      })
    );
  }
  function handdleOkCalendar() {
    /**
     * TODO editar o crear notificaciones
     * * crear un useEffect para los onChange de los datePicker
     */
    const input = document.getElementsByTagName("input");
    console.log(input);
    setIsCalendarOpen(false);
  }
  function onClose() {
    setIsEditOpen(false);
    setIsCalendarOpen(false);
  }

  function onConfirmDelete(content) {
    // TODO comprobación de la eliminación (feedback)
    dispatch(deleteContent(content.id));
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

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
                title={onDeleteText}
                onConfirm={() => onConfirmDelete(content)}
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

      <Modal title="Editar" open={isEditOpen} onOk={handdleOkContent} onCancel={onClose}>
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

      <Modal title="Añadir tiempo" open={isCalendarOpen} onOk={onClose} onCancel={onClose}>
        <Input.Group style={modalStyle}>
          <DatePicker onChange={(value) => console.log(value)} />
          <TimePicker onChange={(value) => console.log(value)} />
        </Input.Group>
      </Modal>
    </>
  );
};

export default ForumContent;
