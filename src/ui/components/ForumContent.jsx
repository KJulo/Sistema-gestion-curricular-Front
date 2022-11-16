import React, { useState, useEffect } from "react";
import "@styles/VirtualClass.less";

import { deleteContent } from "@slices/teachers";
import { useDispatch } from "react-redux";

// Redux
import { editContent } from "@slices/teachers";

import { EditOutlined, DeleteOutlined, CalendarOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Modal, Input, Popconfirm, Select } from "antd";
const { TextArea } = Input;

// Components
import { DateTimeModal } from "@components";

const ForumContent = ({ content, isEdit, process, isLoading, forumId }) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onDeleteText = "¿Desea eliminar esto?";

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
    gap: 20,
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

      <DateTimeModal isOpen={isCalendarOpen} setOpen={setIsCalendarOpen} isLoading={isLoading} />
    </>
  );
};

export default ForumContent;
