import { Space, Spin } from 'antd';
import React from 'react';

const loadingStyle = {
  margin: "20px 0",
  marginBottom: "20px",
  padding: "30px 50px",
  textAlign: "center",
  borderRadius: "4px",
}

const LoadingScreen = () => {
  const size = 'large';
  const tip = "Cargando..."

  return (
    <Space size="middle" tip={tip} style={loadingStyle}>
      <Spin size={size} />
    </Space>
  )
};

export default LoadingScreen;