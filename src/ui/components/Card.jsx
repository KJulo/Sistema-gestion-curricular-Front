import React from 'react';

import { Card as CardAntd } from 'antd';
const { Meta } = CardAntd;
import { UserOutlined } from '@ant-design/icons';

const Card = ({ title, content }) => {
  return (
    <CardAntd
      hoverable
      size='large'
      style={{ width: 300 }}
      cover={<UserOutlined style={{ marginTop: 60, marginBottom: 40, fontSize: '50px' }}/>}
      >
        <Meta title={title} description={content} />
    </CardAntd>
  );
};

export default Card;
