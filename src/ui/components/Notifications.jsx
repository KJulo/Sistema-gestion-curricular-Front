import React, { useEffect, useState } from "react";
import { Divider, List, notification } from "antd";

//import Card from "@components/Card";
import { Card } from "antd";

import "@styles/Notifications.less";

// constants
import { homeWork } from "@constants/homeWork";

import { useDispatch, useSelector } from "react-redux";

import { fetchNotification } from "@slices/students";
import moment from "moment";

const Notifications = ({ data }) => {
  return (
    <div>
      <Divider orientation="center">Notificaciones</Divider>
      <Card>
        <List
          
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              {`${moment(item.fecha).format("DD/MM/YYYY")} | ${item.titulo} | ${item.descripcion}`}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Notifications;
