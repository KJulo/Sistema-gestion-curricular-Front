import React, { useState, useEffect } from "react";
import "@styles/VirtualClass.less";

import { useDispatch } from "react-redux";

import moment from "moment";

// Redux
import { editContent } from "@slices/teachers";

import { Modal, Input, DatePicker, Select, TimePicker, message } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const DateTimeModal = ({ isOpen, setOpen, isLoading }) => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const dateFormat = "YYYY-MM-DD";
  const todayDate = moment(new Date()).format(dateFormat);
  const timeFormat = "HH:mm:ss";
  const defaultTime = "00:00:00";

  const modalStyle = {
    gap: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  };

  function handdleOkCalendar() {
    // Enviar data
    if (!date) {
      message.warning("Debe ingresar una fecha.");
      return;
    }

    // Cerrar modal
    setReady(true);
  }

  // Al renderizar el componente, marcar esta variable en ready
  useEffect(() => {
    if (isOpen) {
      setReady(false);
    }
  }, [isOpen]);

  // Si ya cargó y está listo para cerrarse, cerrar
  useEffect(() => {
    if (!isLoading && ready) {
      setReady(false);
      setOpen(false);
    }
  }, [isLoading]);

  return (
    <Modal
      title="Añadir notificación al curso"
      open={isOpen}
      onOk={() => handdleOkCalendar()}
      onCancel={() => setOpen(false)}
      confirmLoading={isLoading}>
      <Input.Group style={modalStyle}>
        <DatePicker onChange={(value, string) => setDate(string)} />
        <TimePicker onChange={(value, string) => setTime(string)} />
      </Input.Group>
    </Modal>
  );
};

export default DateTimeModal;
