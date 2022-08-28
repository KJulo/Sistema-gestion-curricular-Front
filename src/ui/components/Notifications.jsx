import React, { useEffect, useState } from 'react'
import { Divider, List } from 'antd';

import Card from '@components/Card';

import '@styles/Notifications.less'

// constants
import { homeWork } from '@constants/homeWork';


const Notifications = () => {

  function getText (data) {
    const textList = [];
    data.map((item) => {
      textList.push(item.fecha + ', ' + item.asignatura + ', ' + item.modulo)
    })
    return textList;
  }

  return (
    <div>
      <Divider orientation="center">Notificaciones</Divider>
      <div className='notification-container'>
        <List
          bordered
          dataSource={getText(homeWork)}
          renderItem={(item) => (
            <List.Item>
                {/* <Card content={item} /> */}
                {item}
              </List.Item>
          )}
          />
      </div>
    </div>
  )
}


export default Notifications;