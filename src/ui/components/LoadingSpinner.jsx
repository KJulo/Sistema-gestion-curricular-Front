import React from 'react';
import { Space, Spin } from 'antd';

const loadingStyle = {
  margin: "20px 0",
  marginBottom: "20px",
  padding: "30px 50px",
  textAlign: "center",
  borderRadius: "4px",
}

const LoadingSpinner = (props) => {
  const size = 'large';
  const tip = "Cargando..."

  return (
    props.isLoading ? 
      <Space size="middle" tip={tip} style={loadingStyle}>
        <Spin size={size} />
      </Space>
    : props.children
  )
};

export default LoadingSpinner;