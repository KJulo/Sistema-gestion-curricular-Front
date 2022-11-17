import React, { useState, useEffect } from "react";
import "@styles/VirtualClass.less";

import { useDispatch } from "react-redux";
import moment from "moment";

import { Modal, Input, DatePicker, Select, TimePicker, message, Row, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;

// Redux
import { addNotificacion, updatingNotificacion } from "@slices/teachers";

// Components
import { Notifications } from "@components";

const DateTimeModal = ({ courseId, notifications, isOpen, setOpen, isLoading }) => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const dateFormat = "YYYY-MM-DD";
  const todayDate = new Date();
  const timeFormat = "HH:mm:ss";
  const defaultTime = "23:59:59";

  useEffect(() => {
    dispatch(updatingNotificacion(courseId));
  }, [courseId]);

  function handdleOkCalendar() {
    // Obtener fecha
    let defineTime = defaultTime;
    if (!date) {
      message.warning("Debe ingresar una fecha.");
      return;
    }
    // Verificar que la fecha ingresada sea correcta

    let GivenDate = new Date(date);
    GivenDate.setDate(GivenDate.getDate() + 2);

    if (GivenDate.getTime() <= todayDate.getTime()) {
      message.error("La fecha ingresada no puede ser menor al la fecha actual.");
    }

    if (time) {
      defineTime = time;
    }
    // Obtener inputs
    const title = document.getElementById("input").value;
    if (!title) {
      message.destroy();
      message.warning("Debe de añadir un título");
      return;
    }
    const body = document.getElementById("textArea").value;

    // Enviar data
    const payload = {
      idCurso: courseId,
      titulo: title,
      descripcion: body,
      fecha: date + " " + defineTime,
    };
    dispatch(addNotificacion(payload));

    // Cerrar modal
    setReady(true);
  }

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
      footer={[
        <Button onClick={() => setOpen(false)}>Cancelar</Button>,
        <Button type="primary" loading={isLoading} onClick={() => handdleOkCalendar()}>
          Añadir notificación
        </Button>,
      ]}>
      <Input.Group style={{}}>
        <Row style={{ gap: 44, justifyContent: "space-evenly", marginBottom: 23 }}>
          <DatePicker size="large" onChange={(value, string) => setDate(string)} />
          <TimePicker size="large" onChange={(value, string) => setTime(string)} />
        </Row>
        <Row>
          <Input size="large" placeholder="Titulo." prefix={<RightOutlined />} id="input" />
          <TextArea rows={2} placeholder="Descripción" id="textArea" />
        </Row>
      </Input.Group>
      <Notifications data={notifications ?? []} />
    </Modal>
  );
};

export default DateTimeModal;
