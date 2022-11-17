import React, { useEffect, useState } from "react";
import { Divider, List, notification } from "antd";

//import Card from "@components/Card";
import { Card } from "antd";

import "@styles/Notifications.less";

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
              <List.Item.Meta
                title={<p> {`${item.titulo} - ${moment(item.fecha).format("DD/MM/YYYY")}`}</p>}
                description={item.descripcion}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Notifications;
