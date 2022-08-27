import React, { useState } from 'react';
import { Button, Drawer, Radio, Space, Anchor } from 'antd';

import "@styles/NavBar.less"

const { Link } = Anchor;

const NavBar = ({ toppics }) => {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<div className='mobileVisible' style={{ position: 'fixed' }}>
				<Button type="primary" onClick={showDrawer}>
					<span>Ver Módulos</span>
				</Button>
				<Drawer title="Módulos" placement="left" onClose={onClose} visible={visible}>
					<Anchor targetOffset="65">
						{toppics.map((toppic, index) => {
							return <Link href={toppic} title={toppic} key={index} />
						})}
					</Anchor>
				</Drawer>
			</div>
			<div className='mobileHidden'>
				<Anchor targetOffset="65" >
					{toppics.map((toppic, index) => {
						return <Link href={toppic} title={toppic} key={index} />
					})}
				</Anchor>
			</div>
		</>
	)
}

export default NavBar;