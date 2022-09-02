import React, { useState } from 'react';
import { Button, Drawer, Anchor, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import "@styles/NavBar.less"

const { Link } = Anchor;

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
			if (toppic == 'Inicio')
				return <Link href={"/"+user.tipo+"/"} title={toppic} key={index} />
			return <Link href={"/"+user.tipo+"/"+toppic.toLowerCase()} title={toppic} key={index} />
		})
	}

	function getUser() {
		return (
			<Avatar shape="square" size={120} icon={<UserOutlined />} style={{ margin: '20px 0px 50px' }} />
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