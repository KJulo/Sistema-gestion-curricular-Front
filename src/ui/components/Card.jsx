import React from 'react';

const Card = ({ title, content }) => {
  return (
    <Card
      size='small'
      title={title}
      style={{
        width: 300,
      }}>
      <p>{content}</p>
    </Card>
  );
};

export default Card;
