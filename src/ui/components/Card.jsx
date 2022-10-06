import React from 'react';

import { Card as CardAntd } from 'antd';
const { Meta } = CardAntd;
import { UserOutlined } from '@ant-design/icons';

const Card = ({ title, content, icon }) => {
  const iconStyle = { marginTop: 60, marginBottom: 40, fontSize: '50px' }

  const userIcon = <UserOutlined style={iconStyle}/>;
  const courseIcon = <div style={{...iconStyle, marginLeft:20}}> {icon} </div>;

  return (
    <CardAntd
      hoverable
      size='large'
      style={{ width: 300 }}
      cover={icon === "user" ? userIcon : courseIcon}
      >
        <Meta title={title} description={content} />
    </CardAntd>
  );
};

export default Card;
