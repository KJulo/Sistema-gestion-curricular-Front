import React, { useState } from 'react';
import { Button, Drawer, Anchor, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import "@styles/NavBar.less"

const { Link } = Anchor;
const { Title } = Typography;

const HomeNavBar = ({ toppics, user }) => {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	function getToppics() {
		return toppics.map((toppic, index) => {
			// Quitar tildes
			let toppicURL = toppic.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			// Quitar espacios
			toppicURL = toppicURL.replace(' ', '-');
			// Quitar mayusculas
			toppicURL = toppicURL.toLowerCase();
			// Agregar slash para url
			if (toppic == 'Inicio')
				return <Link href={"/"+user.tipo+"/"} title={toppic} key={index} />
			return <Link href={"/"+user.tipo+"/"+toppicURL} title={toppic} key={index} />
		})
	}

	function getUser() {
		return (
			<div style={{ textAlign: 'center', margin: '10px 0 50px 0' }}>
				<Avatar shape="square" size={120} icon={<UserOutlined />} />
        <Title level={3} style={{ marginTop: 20 }}>{user.nombres} {user.apellidos}</Title>
			</div>
		)
	}

	return (
		<div style={{ margin: 40 }}>
			<div className='mobileVisible' style={{ position: 'fixed' }}>
				<Button type="primary" onClick={showDrawer}>
					<span>Ver Módulos</span>
				</Button>
				<Drawer title="Módulos" placement="left" onClose={onClose} visible={visible}>
					{getUser()}
					<Anchor targetOffset="65">
						{getToppics()}
					</Anchor>
				</Drawer>
			</div>
			<div className='mobileHidden'>
				{getUser()}
				<Anchor targetOffset="65" >
					{getToppics()}
				</Anchor>
			</div>
		</div>
	)
}

export default HomeNavBar;