import React, { useState, useEffect } from "react";
import "@styles/VirtualClass.less";

import { useDispatch } from "react-redux";

// Redux
import { editContent } from "@slices/teachers";

import { Modal, Input, DatePicker, Select, TimePicker } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const DateTimeModal = ({ isOpen, setOpen, isLoading }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const modalStyle = {
    gap: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  };

  function handdleOkCalendar() {
    // Enviar data
    if (!date) {
    }
    if (!time) {
    }

    // Cerrar modal
    useEffect(() => {
      if (!isLoading) setOpen(false);
    }, [isLoading === true]);
  }

  return (
    <Modal
      title="Añadir fecha o tiempo"
      open={isOpen}
      onOk={() => handdleOkCalendar()}
      onCancel={() => setOpen(false)}>
      <Input.Group style={modalStyle}>
        <DatePicker onChange={(value, string) => setDate(string)} />
        <TimePicker onChange={(value, string) => setTime(string)} />
      </Input.Group>
    </Modal>
  );
};

export default DateTimeModal;
