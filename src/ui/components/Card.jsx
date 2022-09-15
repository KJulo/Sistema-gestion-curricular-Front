import React from 'react';
import { Card as CardAntd } from 'antd';

const Card = ({ title, content }) => {
  return (
    <CardAntd
      size='small'
      title={title}
      // extra={<a href="#">More</a>}
      style={{
        width: 300,
      }}>
      <p>{content}</p>
    </CardAntd>
  );
};

export default Card;
