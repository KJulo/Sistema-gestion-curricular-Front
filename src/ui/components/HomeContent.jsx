import React from 'react';

// antd
import { Layout, Typography } from 'antd';
const { Content } = Layout;
const { Title, Text } = Typography

// css

const HomeContent = ({user}) => {

  return (
		<div
			className="site-layout-background"
			style={{
				margin: '24px 16px',
				padding: 50,
				minHeight: 280,
			}}
		>
			<Title> Hola, {user.nombres} {user.apellidos} </Title>
		</div>
  );
};

export default HomeContent;